/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import {
  convertDiemHe10SangHe4,
  convertNumberScoreToAlphabet,
  getBookmarkColorByGrade,
  HEIGHT,
  WIDTH,
} from '@common';
import BoxHSNS from '@components/BoxHSNS';
import ItemLabel from '@components/Item/ItemLabel';
import HeaderReal from '@libcomponents/header-real';
import { getDiemMotMonCuThe, getHinhThucDanhGia } from '@networking/user';
import { translate } from '@utils/i18n/translate';
import Icon from 'react-native-vector-icons/Ionicons';

import ItemLabelCustom from './Item/ItemLabelCustom';
import styles from './styles';
import { KetQuaHocTapProp } from './type';

import { HTDGProps } from '../ThongTinChung/type';
// import BieuDoDiem from './Item/BieuDoDiem';
enum TypeFormDiem {
  DiemTP = 0,
  DiemThi = 1,
  DiemTongKet = 2,
}
const KetQuaHocTap = (props: any) => {
  const itemLopTC = props?.route?.params?.infoClass;

  const [listDiemSV, setListDiemSV] = useState<KetQuaHocTapProp>();

  const [hinhThucDG, sethinhThucDG] = useState([]);

  const [loading, setLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    getDataDiemSV();
  }, []);

  const getDataDiemSV = async () => {
    setLoading(true);

    try {
      const responseDiemSV = await getDiemMotMonCuThe(itemLopTC?._id || 0);

      const resHTDG = await getHinhThucDanhGia();

      const trongSoDanhGia =
        resHTDG?.data?.data
          ?.sort((a: HTDGProps, b: HTDGProps) => {
            return a?.field - b?.field;
          })
          ?.map((item: HTDGProps) => {
            return {
              ...item,
              trongSo:
                responseDiemSV?.data?.data?.diemHpSvHk?.[
                  `trongSo${item?.field}`
                ],
            };
          })
          ?.filter((item: HTDGProps) => item?.trongSo) || [];

      sethinhThucDG(trongSoDanhGia);

      setListDiemSV(responseDiemSV?.data?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const trongSoDiemThi =
    100 -
      hinhThucDG?.reduce(
        (acc, item: HTDGProps) => (acc = acc + item?.trongSo),
        0,
      ) || 0;

  const diemTheoHTDG =
    hinhThucDG?.map((item: HTDGProps, index) => {
      const diem =
        listDiemSV?.diemHpSvHk?.[`diemThanhPhan${item?.field}`] || '--';

      return {
        label: `${item?.ten} (${item?.trongSo || 0}%)`,
        value: `${diem}`,
        type: TypeFormDiem.DiemTP,
        trongSo: item?.trongSo,
        id: index,
      };
    }) || [];

  const diemTheoHTDGEdit =
    hinhThucDG?.map((item: HTDGProps, index) => {
      const diem =
        listDiemSV?.diemHpSvHk?.[`diemThanhPhan${item?.field}`] || '0';

      return {
        label: `${item?.ten} (${item?.trongSo || 0}%)`,
        value: `${diem}`,
        type: TypeFormDiem.DiemTP,
        trongSo: item?.trongSo,
        id: index,
      };
    }) || [];

  const listInfoTopEdit = {
    title: translate('slink:Diem_thanh_phan_DKDT'),
    data: diemTheoHTDGEdit || [],
  };

  const listInfoCenterEdit = {
    title: translate('slink:Diem_thi_ket_thuc_HP'),
    data: [
      {
        label: translate('slink:Diem_cuoi'),
        value: `${listDiemSV?.diemHpSvHk?.diemKthp || '0'}`,
        type: TypeFormDiem.DiemThi,
        trongSo: trongSoDiemThi,
        id: 'Thi',
      },
    ],
  };

  const listInfoTop = {
    title: translate('slink:Diem_thanh_phan_DKDT'),
    data: [
      ...(diemTheoHTDG || []),
      {
        label: translate('slink:Trang_thai_thi'),
        value: `${listDiemSV?.diemHpSvHk?.trangThaiThi || '--'}`,
      },
    ],
  };

  const listInfoCenter = {
    title: translate('slink:Diem_thi_ket_thuc_HP'),
    data: [
      {
        label: translate('slink:Point_1'),
        value: `${listDiemSV?.diemHpSvHk?.diemThi1 || '--'}`,
      },
      {
        label: translate('slink:Point_2'),
        value: `${listDiemSV?.diemHpSvHk?.diemThi2 || '--'}`,
      },
      {
        label: translate('slink:Diem_cuoi'),
        value: `${listDiemSV?.diemHpSvHk?.diemKthp || '--'}`,
      },
    ],
  };

  const diemChu = listDiemSV?.diemHpSvHk?.diemChu;

  const diemHe4 = listDiemSV?.diemHpSvHk?.diemThang4;

  const diemHe10 = listDiemSV?.diemHpSvHk?.diemTongKet;

  const listInfoBottom = {
    title: translate('slink:Diem_tong_ket'),
    data: [
      {
        label: translate('slink:Diem_he_10'),
        value: `${diemHe10 && diemHe10 !== 0 ? diemHe10 : '--'}`,
        styles: styles.textValue,
        type: TypeFormDiem.DiemTongKet,
      },
      {
        label: translate('slink:Diem_he_4'),
        value: `${diemHe4 ? diemHe4 : '--'}`,
        styles: styles.textValue,
        type: TypeFormDiem.DiemTongKet,
      },
      {
        label: translate('slink:Diem_chu'),
        value: `${diemChu ? diemChu : '--'}`,
        type: TypeFormDiem.DiemTongKet,
        styles: {
          ...styles.textValue,
          ...(!!diemChu && {
            color: getBookmarkColorByGrade(diemChu || ''),
          }),
        },
      },
    ],
  };

  const tinhDiemTb = () => {
    let sum = 0;

    for (const i in dataEdit) {
      sum =
        sum +
        ((Number(dataEdit?.[i]?.value) ? Number(dataEdit?.[i]?.value) : 0) *
          (dataEdit?.[i]?.trongSo ?? 0)) /
          100;
    }

    return Math.round(sum * 10) / 10;
  };

  const listInfoBottomEdit = {
    title: translate('slink:Diem_tong_ket'),
    data: [
      {
        label: translate('slink:Diem_he_10'),
        value: `${tinhDiemTb()}`,
        styles: styles.textValue,
        type: TypeFormDiem.DiemTongKet,
      },
      {
        label: translate('slink:Diem_he_4'),
        value: `${convertDiemHe10SangHe4(tinhDiemTb())}`,
        styles: styles.textValue,
        type: TypeFormDiem.DiemTongKet,
      },
      {
        label: translate('slink:Diem_chu'),
        value: `${convertNumberScoreToAlphabet(tinhDiemTb())}`,
        type: TypeFormDiem.DiemTongKet,
        styles: {
          ...styles.textValue,
          ...(!!diemChu && {
            color: getBookmarkColorByGrade(diemChu || ''),
          }),
        },
      },
    ],
  };

  const dataKQHT: any = [listInfoTop, listInfoCenter, listInfoBottom];

  const dataTinhDiemThi = [listInfoTopEdit, listInfoCenterEdit];

  return (
    <View style={styles.container}>
      <HeaderReal
        title={translate('slink:Grade')}
        // childrenRight={
        //   <ChildrenRight edit={isEdit} onPress={() => setIsEdit(!isEdit)} />
        // }
      />
      {!isEdit ? (
        <FlatList
          data={dataKQHT}
          bounces={false}
          contentContainerStyle={{
            paddingTop: HEIGHT(24),
            paddingBottom: HEIGHT(30),
          }}
          nestedScrollEnabled={false}
          renderItem={({ item, index }) => {
            return (
              <RenderItem
                key={index}
                loading={loading}
                title={item?.title}
                data={item?.data}
              />
            );
          }}
        />
      ) : (
        <>
          <FlatList
            data={dataTinhDiemThi}
            extraData={listDiemSV}
            bounces={false}
            contentContainerStyle={{
              paddingTop: HEIGHT(24),
              paddingBottom: HEIGHT(30),
            }}
            nestedScrollEnabled={false}
            renderItem={({ item, index }) => {
              return (
                <RenderItemInput
                  key={index}
                  loading={loading}
                  title={item?.title}
                  data={item?.data}
                  setDataEdit={setDataEdit}
                />
              );
            }}
            ListFooterComponent={
              <FlatList
                data={[listInfoBottomEdit]}
                extraData={dataEdit}
                bounces={false}
                contentContainerStyle={{
                  paddingTop: HEIGHT(24),
                  paddingBottom: HEIGHT(30),
                }}
                nestedScrollEnabled={false}
                renderItem={({ item, index }) => {
                  return (
                    <RenderItemInput
                      key={index}
                      loading={loading}
                      title={item?.title}
                      data={item?.data}
                      setDataEdit={setDataEdit}
                    />
                  );
                }}
              />
            }
          />
        </>
      )}
    </View>
  );
};

export default KetQuaHocTap;
interface Props {
  title: string;
  data: any[];
  loading: boolean;
}
const RenderItem = (props: Props) => {
  const { title, data, loading } = props;

  return (
    <BoxHSNS title={title} visibleAdd={false}>
      <FlatList
        data={data}
        bounces={false}
        nestedScrollEnabled={false}
        style={styles.flatlist}
        renderItem={({ item, index }) => {
          return (
            <ItemLabel
              textValue={item?.styles}
              loading={loading}
              label={item?.label}
              value={`${item?.value}`}
              isLast={index === data?.length - 1}
            />
          );
        }}
      />
    </BoxHSNS>
  );
};

const RenderItemInput = (props: any) => {
  const { title, data, loading, setDataEdit } = props;

  return (
    <BoxHSNS title={title} visibleAdd={false}>
      <FlatList
        data={data}
        bounces={false}
        nestedScrollEnabled={false}
        style={styles.flatlist}
        renderItem={({ item, index }) => {
          if (item?.type === TypeFormDiem.DiemTongKet) {
            return (
              <ItemLabel
                textValue={item?.styles}
                loading={loading}
                label={item?.label}
                value={`${item?.value}`}
                isLast={index === data?.length - 1}
              />
            );
          }

          return (
            <ItemLabelCustom
              textValue={item?.styles}
              loading={loading}
              label={item?.label}
              value={`${item?.value}`}
              isLast={index === data?.length - 1}
              onChangeText={text =>
                setDataEdit((data: any) => {
                  return {
                    ...data,
                    [item?.id]: { value: text, trongSo: item?.trongSo },
                  };
                })
              }
            />
          );
        }}
      />
    </BoxHSNS>
  );
};

const ChildrenRight = ({
  onPress,
  edit,
}: {
  onPress: () => void;
  edit: boolean;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        name={!edit ? 'settings-outline' : 'settings'}
        size={WIDTH(24)}
        color={'white'}
      />
    </TouchableOpacity>
  );
};
