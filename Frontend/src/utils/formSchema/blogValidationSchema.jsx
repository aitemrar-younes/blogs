import * as yup from 'yup'

export const newSchema = yup.object({
    title:yup.string().required('title est obligatoire').min(3),
    content:yup.string().required('content est obligatoire').test(
        'multiLine',
        'it must have multiple line',
        (value) => value.split('\n').length > 1
    ),
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
    .test(
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
    ),
})
/* export const accountCreateValidationSchema = yup.object({
    first_name : yup.string().required('"First name" est obligatoire'),
    last_name : yup.string().required('"Last name" est obligatoire'),
    birth_date : yup.date().required('"Birthdate" est obligatoire')
    .max(new Date, '"Birth date" ne peut pas etre dans le future')
    .test(
        'is-over-18',
        'Age doit etre 18 ans minimum',
        function (value) {
          const currentDate = new Date();
          const selectedDate = new Date(value);
          const ageDifference = currentDate.getFullYear() - selectedDate.getFullYear();
          return ageDifference >= 18;
        }
      ),
    licence_expiry_date : yup.date()
    .min(new Date, '"Licence expiry date" ne peut pas etre dans le passé')
    .required('"Licence expiry date" est obligatoire'),
}) */