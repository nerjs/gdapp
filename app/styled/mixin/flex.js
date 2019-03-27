import { css } from 'styled-components' 


export const flexMixin = css`
    display: flex;
    flex-direction: ${({ column }) => column ? 'column' : 'row'};
    flex-wrap: ${({ wrap }) => wrap ? 'wrap' : 'nowrap'};
`


export const flexCMixin = css`
    ${flexMixin}
    justify-content: center;
    align-items: center;
`
