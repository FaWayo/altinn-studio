import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { getTopBarMenu } from './appBarConfig';
import { ProfileMenu } from 'app-shared/navigation/main-header/profileMenu';
import { VersionControlHeader } from '../version-control/VersionControlHeader';
import { getRepositoryType } from 'app-shared/utils/repository';
import classes from './AppBar.module.css';
import { useTranslation } from 'react-i18next';
import AltinnStudioLogo from 'app-shared/navigation/main-header/AltinnStudioLogo';
import { ThreeDotsMenu } from './ThreeDotsMenu';
import { BranchingIcon } from '@navikt/aksel-icons';
import { Button, ButtonVariant } from '@digdir/design-system-react';
import { publiserPath } from 'app-shared/api-paths';

export interface IAppBarProps {
  activeSubHeaderSelection?: string;
  activeLeftMenuSelection?: string;
  user?: string;
  showSubMenu?: boolean;
}

export const AppBar = ({
  activeSubHeaderSelection,
  user,
  showSubMenu,
}: IAppBarProps) => {
  const { t } = useTranslation();
  const { org, app } = useParams();
  const repositoryType = getRepositoryType(org, app);
  const menu = getTopBarMenu(repositoryType);

  const handlePubliserClick = () => {
    window.location.href = publiserPath(org, app);
  };

  return (
    <div className={classes.root}>
      <div className={classes.appBar}>
        <div className={classes.leftContent}>
          <a href='/'><AltinnStudioLogo /></a>
          <span className={classes.bigSlash}>/</span>
          <span className={classes.appName}>{org && app || ''}</span>
        </div>
        <ul className={classes.menu}>
          {menu.map((item) => (
            <li
              key={item.key}
              className={classNames(
                classes.menuItem,
                activeSubHeaderSelection === item.key && classes.active
              )}
            >
              <Link
                to={item.link.replace(':org', org).replace(':app', app)}
                data-testid={item.key}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
        <div className={classes.rightContent}>
          <div className={classes.rightContentButtons}>
            <Button
              className={classes.previewButton}
              onClick={null}
              variant={ButtonVariant.Outline}
            >
              {t('top_menu.preview')}
            </Button>
            <Button
              onClick={handlePubliserClick}
              variant={ButtonVariant.Outline}
            >
              {t('top_menu.deploy')}
            </Button>
          </div>
          <div className={classes.profileMenuWrapper}>
            <span>{user ? t('shared.header_user_for_org', { user, org }) : org}</span>
            <ProfileMenu showlogout />
          </div>
        </div>
      </div>
      {showSubMenu && (
        <div className={classes.subToolbar}>
          <div className={classes.leftContent}><BranchingIcon width={24} height={24} /></div>
          <div className={classes.rightContent}>
            <VersionControlHeader />
            <ThreeDotsMenu />
          </div>
        </div>
      )}
    </div>
  );
};
