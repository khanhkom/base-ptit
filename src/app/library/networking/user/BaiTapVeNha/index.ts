/* eslint-disable @typescript-eslint/no-explicit-any */
import { MESSAGE_CODE } from '@networking/handleResponseAPI';
import { NetWorkService } from '@networking/service';

import url from './url';

export const getListAssignment = (params: {
  page: number;
  limit: number;
  condition: { lopHocPhanId: string };
}) =>
  NetWorkService.Get({
    url: `${url.ASSIGNMENT}`,
    params,
  }).then((res: any) => {
    return res;
  });

export const getListAssignmentSV = (idLop, loaiLoc, params) =>
  NetWorkService.Get({
    url: `${url.ASSIGNMENT_SV}/${idLop}/me/${loaiLoc}`,
    params,
  }).then(res => {
    return res;
  });

export const getListResponse = (params: {
  page: number;
  limit: number;
  condition: { assignmentId: string };
}) =>
  NetWorkService.Get({
    url: `${url.RESPONSE}`,
    params,
  }).then(res => {
    return res;
  });

export const getAssignment = id =>
  NetWorkService.Get({
    url: `${url.ASSIGNMENT_DATA}/${id}`,
  }).then((res: any) => {
    return res;
  });

export const updateAssignment = (body, id) =>
  NetWorkService.Put(
    {
      url: `${url.ASSIGNMENT_DATA}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then(res => {
    return res;
  });

export const delAssignment = id =>
  NetWorkService.Delete({
    url: `${url.ASSIGNMENT_DATA}/${id}`,
  }).then(res => {
    return res;
  });

export const submitAssignment = body =>
  NetWorkService.Post(
    {
      url: `${url.SUBMIT_ASSIGNMENT}`,
      body,
    },
    { message: MESSAGE_CODE.LUU },
  ).then(res => {
    return res;
  });

export const postBaiTap = (body: any) =>
  NetWorkService.Post(
    {
      url: `${url.ASSIGNMENT_DATA}`,
      body,
    },
    { message: MESSAGE_CODE.THEM_MOI },
  ).then((res: any) => {
    return res;
  });

export const putBaiTap = (body, id) =>
  NetWorkService.Put(
    {
      url: `${url.ASSIGNMENT_DATA}/${id}`,
      body,
    },
    { message: MESSAGE_CODE.CAP_NHAT },
  ).then((res: any) => {
    return res;
  });
