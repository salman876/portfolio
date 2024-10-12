import styled from '@emotion/styled';

import { breakpoints, colors, transitions } from 'constants/theme';

export const Table = styled.table`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  border-collapse: separate;
  border-spacing: 0 8px;

  ${breakpoints.medium} {
    table-layout: fixed; // avoids content jump when cell width changes.
  }

  tr {
    color: ${colors.primaryText};
    cursor: pointer;
  }
`;

export const THead = styled.thead`
  tr {
    font-size: 14px;
    line-height: 24px;
  }
`;

export const TBody = styled.tbody`
  tr {
    height: 80px;
    border-radius: 4px;
    margin: 8px 0;
    background: ${colors.cardBackground};

    :hover {
      opacity: 0.8;
      transform: scale(1.01);
      transition: ${transitions.medium};
    }
  }

  td {
    border: 1px solid ${colors.cardBackground};

    :first-of-type {
      border-radius: 4px 0 0 4px;
    }
    :last-of-type {
      border-radius: 0 4px 4px 0;
    }
  }
`;

export const TableHeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  margin-right: 16px;
`;

export const Property = styled.p`
  font-family: monospace;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
`;

export const Chevron = styled.img`
  margin-left: 4px;
  display: block;
`;
