import '@emotion/react'
import { ColorsType, FontSizeType, FontWeightType, WidthType } from './theme'

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsType
    fontSize: FontSizeType
    fontWeight: FontWeightType
    width: WidthType
  }
}