import * as yup from 'yup'

export const newSchema = yup.object({
    title:yup.string().required('title est obligatoire').min(3),
    content:yup.string().required('content est obligatoire'),
    image : yup.mixed()
    .required('image est obligatoire')
    .test(
        'fileType',
        'Only image files are allowed.',
        (value) => !value || (value && value[0] && /^image\//.test(value[0].type))
    )
    .test(
        'fileSize',
        'File size is too large. Maximum size is 5 MB.',
        (value) => !value || (value && value[0]?.size <= 5 * 1024 * 1024)
    )
})
export const updateSchema = yup.object({
    title:yup.string().required('title est obligatoire').min(3),
    content:yup.string().required('content est obligatoire'),
    image : yup.mixed().nullable()
    .test(
        'fileType',
        'Only image files are allowed.',
        (value) => !value || (value && value[0] && /^image\//.test(value[0].type))
    )
    .test(
        'fileSize',
        'File size is too large. Maximum size is 5 MB.',
        (value) => !value || (value && value[0]?.size <= 5 * 1024 * 1024)
    )
})

/* .test(
    'isHD',
    'Only HD images are allowed.',
    async (value) =>
        !value ||
        (value &&
        value[0] &&
        (await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(value[0]);
            img.onload = () => {
            resolve(img.width >= 1920 && img.height >= 1080);
            };
            img.onerror = () => reject(false);
        })))
), */