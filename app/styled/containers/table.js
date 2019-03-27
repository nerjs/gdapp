import styled from 'styled-components'

import { parseSize } from 'styled/helpers'
import { flexMixin } from 'styled/mixin'

export const TableContainer = styled.div`
    ${flexMixin}
    width: 100%;
`



export const TableCol = styled.div`
    width: ${({ width }) => width ? parseSize(width) : '100%'};
    outline: 1px solid orange;
`
