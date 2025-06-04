const font = (weight, size = 14) => ({
    fontSize: size,
    fontFamily: `Poppins-${weight}`,
});

const fonts = {
    bold: (size) => font('Bold', size),
    light: (size) => font('Light', size),
    italic: (size) => font('Italic', size),
    medium: (size) => font('Medium', size),
    regular: (size) => font('Regular', size),
    semiBold: (size) => font('SemiBold', size),
    extraBold: (size) => font('ExtraBold', size),
    boldItalic: (size) => font('BoldItalic', size),
    mediumItalic: (size) => font('MediumItalic', size),
    semiBoldItalic: (size) => font('SemiBoldItalic', size),
    extraBoldItalic: (size) => font('ExtraBoldItalic', size),
};

export default fonts;
