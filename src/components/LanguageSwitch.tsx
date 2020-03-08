import React from 'react';
import { Translate } from '@styled-icons/material/Translate';

import { DropdownMenu, DropdownMenuItem } from './DropdownMenu';
import { MenuButton } from './MenuBar';
import { LOCALES } from '../types/Locales';
import { useIntl } from '../context/react-intl';

export const LanguageSwitch: React.FC = () => {
  const { switchLocale } = useIntl();

  return (
    <DropdownMenu
      items={
        <>
          <DropdownMenuItem onClick={() => switchLocale(LOCALES.PT)}>
            PT
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchLocale(LOCALES.EN)}>
            EN
          </DropdownMenuItem>
        </>
      }
    >
      {({ toggleDropdown }) => {
        return (
          <MenuButton onClick={toggleDropdown}>
            <Translate size={21} />
          </MenuButton>
        );
      }}
    </DropdownMenu>
  );
};
