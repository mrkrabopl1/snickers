declare module "*.css" {
    const style: any;
    export default style
}

declare module "*.scss" {
    const style: any;
    export default style
}

declare module "*.less" {
    const style: any;
    export default style
}

declare module '*.svg' {
    import React = require('react')
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src
}

declare module '*.bmp' {
    const path: string
    export default path
}

declare module '*.gif' {
    const path: string
    export default path
}

declare module '*.jpg' {
    const path: string
    export default path
}

declare module '*.jpeg' {
    const path: string
    export default path
}

declare module '*.png' {
    const path: string
    export default path
}