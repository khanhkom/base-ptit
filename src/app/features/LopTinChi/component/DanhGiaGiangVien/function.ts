import { EQUESTION_TYPE } from '@common';
import {
  BieuMauKhaoSatProps,
  DanhSachCauHoi,
} from '@features/LopTinChi/ChiTietLopTinChi/type';
import { uploadDocument } from '@networking/user';
import { ValuesProps } from './type';

export const ConvertKhaoSat = async (
  values: { [key: string]: ValuesProps },
  data: BieuMauKhaoSatProps,
) => {
  const flattenedCauHoi: DanhSachCauHoi[] = data?.danhSachKhoi?.flatMap(
    khoi => khoi?.danhSachCauHoi,
  );
  const danhSachKetQua = Object.values(values);
  const dataSubmit = flattenedCauHoi?.map(async cauHoi => {
    const value =
      danhSachKetQua?.filter(ketQua => ketQua?.idCauHoi === cauHoi?._id) || [];
    switch (cauHoi?.loai) {
      case EQUESTION_TYPE?.GridSingleChoice:
        return {
          listLuaChonBang: value,
          idCauHoi: cauHoi?._id,
        };
      case EQUESTION_TYPE?.GridMultipleChoice:
        const listLuaChonBang = value.flatMap(item =>
          item?.listCot?.map(cot => ({ idHang: item.idHang, idCot: cot })),
        );
        return {
          listLuaChonBang,
          idCauHoi: cauHoi?._id,
        };
      case EQUESTION_TYPE?.Text:
      case EQUESTION_TYPE?.NumbericRange:
      case EQUESTION_TYPE?.SingleChoice:
      case EQUESTION_TYPE?.MultipleChoice:
        return value?.[0];
      case EQUESTION_TYPE?.UploadFile:
        const listAnswer =
          value?.[0]?.listUrlFile?.map(async file => {
            if (file?.type) {
              const listUrlFileResponse: any = await uploadDocument([file]);
              return listUrlFileResponse?.[0]?.url;
            } else {
              return file?.uri;
            }
          }) || [];
        const listUrlFile = await Promise.all(listAnswer);

        return { ...value?.[0], listUrlFile };

      default:
        return;
    }
  });
  const res: any[] = await Promise.all(dataSubmit);
  return res;
};
