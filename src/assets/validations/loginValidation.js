import * as yup from 'yup';

const loginValidationShema = yup.object().shape({
  email: yup.string().email('Geçerli bir email gir').required('Zorunlu Alan'),
  password: yup.string().min(5, 'Minimum 5 karakter giriniz.').required('Zorunlu Alan'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], "Parolalar uyuşmuyor").required('Zorunlu Alan')
});

export default loginValidationShema;