export const colors = {
  darkYellow: '#ffc71d',
  middleYellow: '#FDDE76',
  lightYellow: '#FFF3CB',
  whiteYellow: '#FFFAE9',
  black: '#1B1B1B',
  darkGrey: '#575757',
  grey: '#9E9E9E',
  middleGrey: '#BFBFBF',
  lightGrey: '#ECECEC',
  white: '#FFFFFF',
  red: '#D32F2F',
}
export const fontSize = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
  xxxl: '80px'
}

export const fontWeight = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900
}

export const width = {
  max: '430px'
}

export const height = {
  max: '990px'
}

export type ColorsType = typeof colors
export type FontSizeType = typeof fontSize
export type FontWeightType = typeof fontWeight
export type WidthType = typeof width
export type HeightType = typeof height

interface Theme {
  colors: ColorsType
  fontSize: FontSizeType
  fontWeight: FontWeightType
  width: WidthType
  height: HeightType
}

const theme: Theme = {
  colors,
  fontSize,
  fontWeight,
  width,
  height
}

export default theme
