const size = {
    lg: '1024px',
    sm: '768px',
    xs: '425px'
}

const device = {
    laptop: `(max-width: ${size.lg})`,
    tablet: `(max-width: ${size.sm})`,
    mobile: `(max-width: ${size.xs})`
}

const breakpoint = {
    device
}

export default breakpoint;