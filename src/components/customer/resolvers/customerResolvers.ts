import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export const customerRegisterSchema = yupResolver(yup.object({
  aptName: yup.string().required(),
  aptAddr: yup.string().required(),
  account: yup.string().trim().required().max(80, "아이디는 80자 이하입니다"),
  password: yup.string().trim().required(),
  confirmPassword: yup.string().trim().required().oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
  name: yup.string().trim().required(),
  phone: yup.string().trim().required(),
}));

export const customerUpdateSchema = yupResolver(yup.object({
  aptId: yup.number().required(),
  aptName: yup.string().required(),
  aptAddr: yup.string().required(),
  account: yup.string().trim().required().max(80, "아이디는 80자 이하입니다"),
  password: yup.string().trim(),
  confirmPassword: yup.string().trim().oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
  name: yup.string().trim().required(),
  phone: yup.string().trim().required(),
}));

