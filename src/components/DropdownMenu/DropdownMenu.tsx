import React from 'react';

import * as S from './styled';
import { DropdownMenuProps } from './types';
import { ClickOutside } from '../ClickOutside';

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  children,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <S.DropdownMenuWrapper>
      <ClickOutside handleClickOutside={() => setIsVisible(false)}>
        {children({
          isVisible,
          toggleDropdown: () => {
            setIsVisible(!isVisible);
          },
        })}
      </ClickOutside>

      {isVisible && (
        <>
          <S.DropdownMenu>
            <S.DropdownMenuList>{items}</S.DropdownMenuList>
          </S.DropdownMenu>
          <S.ArrowUp />
        </>
      )}
    </S.DropdownMenuWrapper>
  );
};
