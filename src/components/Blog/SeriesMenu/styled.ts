import styled from 'styled-components';
import media from 'styled-media-query';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';

import { pxToRem } from '../../../styles/blogPost';
import { Card as DefaultCard } from '../../Ui';

export const Card = styled(DefaultCard)`
  padding: 0;
  margin: 24px 0;
`;

export const Wrapper = styled.div`
  padding: 0;
  --common-padding: 10px 16px;
`;

const CommonInfo = styled.div<{ expanded: boolean }>`
  margin: 0;
  padding: var(--common-padding);
  font-weight: bold;
  font-size: ${pxToRem(18)};
  line-height: 1.4;

  ${media.greaterThan('medium')`
    font-size: ${pxToRem(20)};
  `}

  cursor: pointer;
  > * {
    cursor: pointer;
  }
`;

export const Info = styled(CommonInfo)`
  padding-bottom: ${({ expanded }) => (expanded ? '10px' : '0')};

  display: flex;
  justify-content: space-between;
`;

type Expanded = {
  expanded: boolean;
};

export const ExpanderButton = styled(motion.button).attrs<Expanded>(
  (props) => ({
    initial: 'collapsed',
    animate: props.expanded ? 'collapsed' : 'open',
    variants: {
      open: { rotate: '0deg' },
      collapsed: { rotate: '180deg' },
    },
  }),
)<Expanded>`
  border: none;
  background-color: transparent;
  padding: 0;
  color: ${({ theme }) => theme.color.font};
`;

export const List = styled(motion.ul).attrs({
  initial: 'collapsed',
  animate: 'open',
  exit: 'collapsed',
  variants: {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  },
  transition: { ease: [0.4, 0, 0.2, 1] },
})`
  margin: 0;
  border-top: ${({ theme }) => `1px solid ${theme.color.border}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.border}`};
`;

export const Item = styled(motion.li)`
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.contentSans};

  font-size: ${pxToRem(16)};
  margin: 0;
  padding: 0;

  ${media.greaterThan('medium')`
    font-size: ${pxToRem(18, false)};
  `}

  &.active {
    background-color: rgba(3, 168, 124, 1);
    color: white;
  }
  &:hover:not(.active) {
    background-color: ${transparentize(0.8, 'rgba(3, 168, 124, 1)')};
  }

  &:last-child {
    border-bottom-left-radius: var(--card-border-radius);
    border-bottom-right-radius: var(--card-border-radius);
  }

  a {
    text-decoration: none;
    padding: var(--common-padding);
    display: block;
  }
`;

export const MenuFooter = styled(CommonInfo)`
  padding-top: ${({ expanded }) => {
    console.log(expanded);
    return expanded ? '10px' : '0';
  }};

  font-family: ${({ theme }) => theme.font.contentSans};
  font-weight: normal;
  opacity: 0.67;

  span {
    margin: 0;
  }
`;
