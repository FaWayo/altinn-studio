using System.Collections.Generic;
using System.Text;
using Altinn.Studio.DataModeling.Metamodel;
using Altinn.Studio.Designer.Models;
using Altinn.Studio.Designer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Altinn.Studio.Designer.Controllers
{
    /// <summary>
    /// This is the controller responsible for handling model functionality in AltinnCore
    /// </summary>
    [Authorize]
    [AutoValidateAntiforgeryToken]
    [Route("designer/{org}/{app:regex(^[[a-z]]+[[a-zA-Z0-9-]]+[[a-zA-Z0-9]]$)}/[controller]/{action=Index}")]
    public class ModelController : Controller
    {
        private readonly IRepository _repository;
        private readonly ILoggerFactory _loggerFactory;
        private readonly ILogger _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="ModelController"/> class
        /// </summary>
        /// <param name="repositoryService">The service Repository Service</param>
        /// <param name="loggerFactory"> the logger factory</param>
        /// <param name="logger">the logger.</param>
        public ModelController(IRepository repositoryService, ILoggerFactory loggerFactory, ILogger<ModelController> logger)
        {
            _repository = repositoryService;
            _loggerFactory = loggerFactory;
            _logger = logger;
        }

        /// <summary>
        /// The default action presenting the application model.
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>The model main page</returns>
        [Route("")]
        public ActionResult Index(string org, string app)
        {
            ModelMetadata metadata = _repository.GetModelMetadata(org, app);
            return View(metadata);
        }

        private void HandleTexts(string org, string app, Dictionary<string, Dictionary<string, TextResourceElement>> modelTexts)
        {
            // <textResourceElement.Id <language, textResourceElement>>
            Dictionary<string, Dictionary<string, TextResourceElement>> existingTexts = _repository.GetServiceTexts(org, app);

            if (existingTexts == null)
            {
                existingTexts = new Dictionary<string, Dictionary<string, TextResourceElement>>();
            }

            foreach (KeyValuePair<string, Dictionary<string, TextResourceElement>> textResourceElementDict in modelTexts)
            {
                string textResourceElementId = textResourceElementDict.Key;

                if (!existingTexts.ContainsKey(textResourceElementId))
                {
                    existingTexts.Add(textResourceElementId, new Dictionary<string, TextResourceElement>());
                }

                foreach (KeyValuePair<string, TextResourceElement> localizedString in textResourceElementDict.Value)
                {
                    string language = localizedString.Key;
                    TextResourceElement textResourceElement = localizedString.Value;
                    if (!existingTexts[textResourceElementId].ContainsKey(language))
                    {
                        existingTexts[textResourceElementId].Add(language, textResourceElement);
                    }
                }
            }

            _repository.SaveServiceTexts(org, app, existingTexts);
        }

        /// <summary>
        /// Return JSON presentation of the model
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>The model as JSON</returns>
        [HttpGet]
        public IActionResult GetJson(string org, string app)
        {
            try
            {
                ModelMetadata metadata = _repository.GetModelMetadata(org, app);
                return Json(metadata, new JsonSerializerSettings() { Formatting = Formatting.Indented });
            }
            catch
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Returns the model as C# code
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>The model as C#</returns>
        [HttpGet]
        public ActionResult GetModel(string org, string app)
        {
            return Content(_repository.GetAppModel(org, app), "text/plain", Encoding.UTF8);
        }

        /// <summary>
        /// Get the model as XSD
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>The model representation as XSD</returns>
        [HttpGet]
        public ActionResult GetXsd(string org, string app)
        {
            return Content(_repository.GetXsdModel(org, app), "text/plain", Encoding.UTF8);
        }

        /// <summary>
        /// Get the model as Json Schema
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>The model representation as Json Schema</returns>
        [HttpGet]
        public ActionResult GetJsonSchema(string org, string app)
        {
            return Content(_repository.GetJsonSchemaModel(org, app), "text/plain", Encoding.UTF8);
        }
    }
}
