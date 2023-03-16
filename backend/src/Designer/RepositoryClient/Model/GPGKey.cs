/*
 * Gitea API.
 *
 * This documentation describes the Gitea API.
 *
 * OpenAPI spec version: 1.1.1
 *
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using Newtonsoft.Json;

namespace Altinn.Studio.Designer.RepositoryClient.Model
{
    /// <summary>
    /// GPGKey a user GPG key to sign commit and tag in repository
    /// </summary>
    [DataContract]
    public partial class GPGKey : IEquatable<GPGKey>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GPGKey" /> class.
        /// </summary>
        /// <param name="CanCertify">CanCertify.</param>
        /// <param name="CanEncryptComms">CanEncryptComms.</param>
        /// <param name="CanEncryptStorage">CanEncryptStorage.</param>
        /// <param name="CanSign">CanSign.</param>
        /// <param name="CreatedAt">CreatedAt.</param>
        /// <param name="Emails">Emails.</param>
        /// <param name="ExpiresAt">ExpiresAt.</param>
        /// <param name="Id">Id.</param>
        /// <param name="KeyId">KeyId.</param>
        /// <param name="PrimaryKeyId">PrimaryKeyId.</param>
        /// <param name="PublicKey">PublicKey.</param>
        /// <param name="Subkeys">Subkeys.</param>
        public GPGKey(bool? CanCertify = default(bool?), bool? CanEncryptComms = default(bool?), bool? CanEncryptStorage = default(bool?), bool? CanSign = default(bool?), DateTime? CreatedAt = default(DateTime?), List<GPGKeyEmail> Emails = default(List<GPGKeyEmail>), DateTime? ExpiresAt = default(DateTime?), long? Id = default(long?), string KeyId = default(string), string PrimaryKeyId = default(string), string PublicKey = default(string), List<GPGKey> Subkeys = default(List<GPGKey>))
        {
            this.CanCertify = CanCertify;
            this.CanEncryptComms = CanEncryptComms;
            this.CanEncryptStorage = CanEncryptStorage;
            this.CanSign = CanSign;
            this.CreatedAt = CreatedAt;
            this.Emails = Emails;
            this.ExpiresAt = ExpiresAt;
            this.Id = Id;
            this.KeyId = KeyId;
            this.PrimaryKeyId = PrimaryKeyId;
            this.PublicKey = PublicKey;
            this.Subkeys = Subkeys;
        }

        /// <summary>
        /// Gets or Sets CanCertify
        /// </summary>
        [DataMember(Name = "can_certify", EmitDefaultValue = false)]
        public bool? CanCertify { get; set; }

        /// <summary>
        /// Gets or Sets CanEncryptComms
        /// </summary>
        [DataMember(Name = "can_encrypt_comms", EmitDefaultValue = false)]
        public bool? CanEncryptComms { get; set; }

        /// <summary>
        /// Gets or Sets CanEncryptStorage
        /// </summary>
        [DataMember(Name = "can_encrypt_storage", EmitDefaultValue = false)]
        public bool? CanEncryptStorage { get; set; }

        /// <summary>
        /// Gets or Sets CanSign
        /// </summary>
        [DataMember(Name = "can_sign", EmitDefaultValue = false)]
        public bool? CanSign { get; set; }

        /// <summary>
        /// Gets or Sets CreatedAt
        /// </summary>
        [DataMember(Name = "created_at", EmitDefaultValue = false)]
        public DateTime? CreatedAt { get; set; }

        /// <summary>
        /// Gets or Sets Emails
        /// </summary>
        [DataMember(Name = "emails", EmitDefaultValue = false)]
        public List<GPGKeyEmail> Emails { get; set; }

        /// <summary>
        /// Gets or Sets ExpiresAt
        /// </summary>
        [DataMember(Name = "expires_at", EmitDefaultValue = false)]
        public DateTime? ExpiresAt { get; set; }

        /// <summary>
        /// Gets or Sets Id
        /// </summary>
        [DataMember(Name = "id", EmitDefaultValue = false)]
        public long? Id { get; set; }

        /// <summary>
        /// Gets or Sets KeyId
        /// </summary>
        [DataMember(Name = "key_id", EmitDefaultValue = false)]
        public string KeyId { get; set; }

        /// <summary>
        /// Gets or Sets PrimaryKeyId
        /// </summary>
        [DataMember(Name = "primary_key_id", EmitDefaultValue = false)]
        public string PrimaryKeyId { get; set; }

        /// <summary>
        /// Gets or Sets PublicKey
        /// </summary>
        [DataMember(Name = "public_key", EmitDefaultValue = false)]
        public string PublicKey { get; set; }

        /// <summary>
        /// Gets or Sets Subkeys
        /// </summary>
        [DataMember(Name = "subkeys", EmitDefaultValue = false)]
        public List<GPGKey> Subkeys { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class GPGKey {\n");
            sb.Append("  CanCertify: ").Append(CanCertify).Append("\n");
            sb.Append("  CanEncryptComms: ").Append(CanEncryptComms).Append("\n");
            sb.Append("  CanEncryptStorage: ").Append(CanEncryptStorage).Append("\n");
            sb.Append("  CanSign: ").Append(CanSign).Append("\n");
            sb.Append("  CreatedAt: ").Append(CreatedAt).Append("\n");
            sb.Append("  Emails: ").Append(Emails).Append("\n");
            sb.Append("  ExpiresAt: ").Append(ExpiresAt).Append("\n");
            sb.Append("  Id: ").Append(Id).Append("\n");
            sb.Append("  KeyId: ").Append(KeyId).Append("\n");
            sb.Append("  PrimaryKeyId: ").Append(PrimaryKeyId).Append("\n");
            sb.Append("  PublicKey: ").Append(PublicKey).Append("\n");
            sb.Append("  Subkeys: ").Append(Subkeys).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="input">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object input)
        {
            return this.Equals(input as GPGKey);
        }

        /// <summary>
        /// Returns true if GPGKey instances are equal
        /// </summary>
        /// <param name="input">Instance of GPGKey to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(GPGKey input)
        {
            if (input == null)
            {
                return false;
            }

            return
                (
                    this.CanCertify == input.CanCertify ||
                    (this.CanCertify != null &&
                    this.CanCertify.Equals(input.CanCertify))) &&
                (
                    this.CanEncryptComms == input.CanEncryptComms ||
                    (this.CanEncryptComms != null &&
                    this.CanEncryptComms.Equals(input.CanEncryptComms))) &&
                (
                    this.CanEncryptStorage == input.CanEncryptStorage ||
                    (this.CanEncryptStorage != null &&
                    this.CanEncryptStorage.Equals(input.CanEncryptStorage))) &&
                (
                    this.CanSign == input.CanSign ||
                    (this.CanSign != null &&
                    this.CanSign.Equals(input.CanSign))) &&
                (
                    this.CreatedAt == input.CreatedAt ||
                    (this.CreatedAt != null &&
                    this.CreatedAt.Equals(input.CreatedAt))) &&
                (
                    this.Emails == input.Emails ||
                    (this.Emails != null &&
                    this.Emails.SequenceEqual(input.Emails))) &&
                (
                    this.ExpiresAt == input.ExpiresAt ||
                    (this.ExpiresAt != null &&
                    this.ExpiresAt.Equals(input.ExpiresAt))) &&
                (
                    this.Id == input.Id ||
                    (this.Id != null &&
                    this.Id.Equals(input.Id))) &&
                (
                    this.KeyId == input.KeyId ||
                    (this.KeyId != null &&
                    this.KeyId.Equals(input.KeyId))) &&
                (
                    this.PrimaryKeyId == input.PrimaryKeyId ||
                    (this.PrimaryKeyId != null &&
                    this.PrimaryKeyId.Equals(input.PrimaryKeyId))) &&
                (
                    this.PublicKey == input.PublicKey ||
                    (this.PublicKey != null &&
                    this.PublicKey.Equals(input.PublicKey))) &&
                (
                    this.Subkeys == input.Subkeys ||
                    (this.Subkeys != null &&
                    this.Subkeys.SequenceEqual(input.Subkeys)));
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            // Overflow is fine, just wrap
            unchecked
            {
                int hashCode = 41;
                if (this.CanCertify != null)
                {
                    hashCode = (hashCode * 59) + this.CanCertify.GetHashCode();
                }

                if (this.CanEncryptComms != null)
                {
                    hashCode = (hashCode * 59) + this.CanEncryptComms.GetHashCode();
                }

                if (this.CanEncryptStorage != null)
                {
                    hashCode = (hashCode * 59) + this.CanEncryptStorage.GetHashCode();
                }

                if (this.CanSign != null)
                {
                    hashCode = (hashCode * 59) + this.CanSign.GetHashCode();
                }

                if (this.CreatedAt != null)
                {
                    hashCode = (hashCode * 59) + this.CreatedAt.GetHashCode();
                }

                if (this.Emails != null)
                {
                    hashCode = (hashCode * 59) + this.Emails.GetHashCode();
                }

                if (this.ExpiresAt != null)
                {
                    hashCode = (hashCode * 59) + this.ExpiresAt.GetHashCode();
                }

                if (this.Id != null)
                {
                    hashCode = (hashCode * 59) + this.Id.GetHashCode();
                }

                if (this.KeyId != null)
                {
                    hashCode = (hashCode * 59) + this.KeyId.GetHashCode();
                }

                if (this.PrimaryKeyId != null)
                {
                    hashCode = (hashCode * 59) + this.PrimaryKeyId.GetHashCode();
                }

                if (this.PublicKey != null)
                {
                    hashCode = (hashCode * 59) + this.PublicKey.GetHashCode();
                }

                if (this.Subkeys != null)
                {
                    hashCode = (hashCode * 59) + this.Subkeys.GetHashCode();
                }

                return hashCode;
            }
        }

        /// <summary>
        /// To validate all properties of the instance
        /// </summary>
        /// <param name="validationContext">Validation context</param>
        /// <returns>Validation Result</returns>
        IEnumerable<ValidationResult> IValidatableObject.Validate(ValidationContext validationContext)
        {
            yield break;
        }
    }
}
