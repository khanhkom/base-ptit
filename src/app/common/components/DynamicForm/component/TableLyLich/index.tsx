/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import {
  Text,
  // TouchableOpacity,
  View,
} from 'react-native';

import { WIDTH } from '@common';
import BaseTableComponent from '@components/BaseTableComponent';
import ItemTrong from '@components/Item/ItemTrong';
import BaseButton from '@components/Popup/BaseButton';
import { HelperText } from '@libcomponents/helper-text';
import ItemInfor from '@libcomponents/ItemTable';
import { navigateScreen } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import moment from 'moment';

import { styles } from './styles';
import { translate } from '@utils/i18n/translate';

const TableLyLich = (props: any) => {
  const {
    label,
    // relatedElement,
    itemData,
    changeListFile,
    arrayFile,
    disableDelete,
    isRequired,
    error,
    tableHeader,
  } = props;

  const [tableData, setTableData] = React.useState<any>(arrayFile ?? []);

  useEffect(() => {
    changeListFile && changeListFile(arrayFile);
  }, []);

  const handleSeeDocument = (item: any, index?: number) => {
    if (itemData?._id === 'congTrinhChuYeu') {
      navigateScreen(APP_SCREEN.XEMCHITIETKHAIBAO, {
        data: {
          danhMucNCKH: item?.danhMucNCKH,
          thongTinKhaiBao: { khaiBaoNCKH: item },
          // thongTinKhaiBao: data,
          // disabled: true,
        },
      });

      return;
    }

    if (itemData?._id !== 'hoatDongKhac') {
      navigateScreen(APP_SCREEN.THEMMOILYLICH, {
        item: item,
        id: itemData?._id,
        disabled: disableDelete,
        onAddItem,
        index,
      });

      return;
    }
  };

  const handleDelete = (index: number) => {
    const newData = tableData;

    newData.splice(index, 1);

    changeListFile && changeListFile(newData);

    setTableData(JSON.parse(JSON.stringify(newData)));
  };

  const ongoToAdd = () => {
    navigateScreen(APP_SCREEN.THEMMOILYLICH, {
      onAddItem,
      id: itemData?._id,
      // relatedElement,
    });
  };

  const addFromLib = () => {
    navigateScreen(APP_SCREEN.ADDFROMLIB, {
      onAddItem: onAddFromLib,
      id: itemData?._id,
      // relatedElement,
    });
  };

  const onAddFromLib = (list: any[]) => {
    changeListFile && changeListFile(list);

    setTableData(JSON.parse(JSON.stringify(list)));
  };

  const onAddItem = (item: any, index: number | undefined) => {
    let newData = tableData;

    if (index !== undefined) {
      newData.splice(index, 1, item);
    } else {
      newData = [...tableData, item];
    }

    changeListFile && changeListFile(newData);

    setTableData(JSON.parse(JSON.stringify(newData)));
  };

  const widthArr = [WIDTH(60), WIDTH(140), WIDTH(311 - 140 - 60)];

  return (
    <View style={styles.container}>
      <View style={styles.textLabel}>
        <Text style={styles.label}>
          {`${label ?? ''}`}
          {isRequired && <Text style={styles.dot}>{' * '}</Text>}
        </Text>
      </View>
      <ListFile
        ongoToAdd={ongoToAdd}
        tableahead={tableHeader}
        widthArr={widthArr}
        disableDelete={disableDelete}
        handleDelete={handleDelete}
        data={tableData}
        hasAdd={itemData?.hasAdd}
        hasAddFromLib={itemData?.hasAddFromLib}
        hasEdit={itemData?.hasEdit}
        addFromLib={addFromLib}
        handleSeeDocument={handleSeeDocument}
      />
      <HelperText
        visible={error !== undefined}
        msg={error ?? ''}
        type={'error'}
      />
    </View>
  );
};

export default TableLyLich;

const ListFile = ({
  tableahead,
  widthArr,
  data,
  ongoToAdd,
  addFromLib,
  handleSeeDocument,
  hasAdd,
  hasAddFromLib,
}: any) => {
  const tableData = data?.map((item: any, index: number) => {
    return [
      <ItemInfor
        onPress={() => handleSeeDocument(item, index)}
        key={index}
        // disabled={!hasAdd && item?.idType !== 'congTrinhChuYeu'}
        content={String(index + 1)}
      />,
      <ItemInfor
        onPress={() => handleSeeDocument(item, index)}
        // disabled={!hasAdd && item?.idType !== 'congTrinhChuYeu'}
        key={index}
        content={displayTable(item)?.data0}
      />,
      <ItemInfor
        onPress={() => handleSeeDocument(item, index)}
        // disabled={!hasAdd && item?.idType !== 'congTrinhChuYeu'}
        key={index}
        content={displayTable(item)?.data1}
      />,
    ];
  });

  return (
    <View style={styles.viewTable}>
      {data?.length === 0 ? (
        <ItemTrong customStyle={styles.viewtrong} />
      ) : (
        <BaseTableComponent
          tableHead={tableahead}
          widthArr={widthArr}
          tableData={tableData}
          contentContainerStyle={styles.contentContainer}
        />
      )}
      <ListButton
        hasAdd={hasAdd}
        hasAddFromLib={hasAddFromLib}
        ongoToAdd={ongoToAdd}
        addFromLib={addFromLib}
      />
    </View>
  );
};

const ListButton = (props: {
  ongoToAdd?: () => void;
  addFromLib?: () => void;
  hasAddFromLib: boolean;
  hasAdd: boolean;
}) => {
  const { ongoToAdd, addFromLib, hasAdd, hasAddFromLib } = props;

  return (
    <View style={styles.viewButton}>
      {hasAdd && (
        <Text onPress={ongoToAdd} style={styles.textThemMoi}>
          {translate('slink:Add')}
        </Text>
      )}
      {hasAddFromLib && (
        <BaseButton
          title="Thêm từ sẵn có"
          onPress={addFromLib}
          text={styles.textButton}
          style={styles.button}
        />
      )}
    </View>
  );
};
// const ItemFile = ({
//   item,
//   handleSeeDocument,
//   disableDelete,
//   handleDelete,
// }: any) => {
//   return (
//     <View style={styles.containerItem}>
//       <Text style={styles.fileName}>
//         {`${item?.[0]?.label ?? ''}: `}
//         <Text
//           style={styles.textList}
//           onPress={handleSeeDocument && handleSeeDocument}>
//           {item?.[0]?.value ?? ''}
//         </Text>
//       </Text>
//       <DeleteIcon disableDelete={disableDelete} handleDelete={handleDelete} />
//     </View>
//   );
// };

// const DeleteIcon = ({ handleDelete, disableDelete }: any) => {
//   if (disableDelete) {
//     return <View />;
//   } else {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.6}
//         style={styles.iconDelete}
//         onPress={handleDelete}
//         hitSlop={styles.hitSlop}>
//         <Icon size={WIDTH(10)} name="close" color={'#ABABAB'} />
//       </TouchableOpacity>
//     );
//   }
// };

const displayTable = (data: any) => {
  switch (data?.idType) {
    case 'congTrinhChuYeu':
      return {
        data0: data?.tenSanPhamNCKH || '--',
        data1: data?.thoiGianToChuc
          ? moment(data?.thoiGianToChuc).format('MM/YYYY')
          : '--',
      };
    case 'noiDungVanBang':
      return {
        data0: data?.tenVaNoiDung || '--',
        data1: data?.namCap || '--',
      };
    case 'quaTrinhCongTac':
      return {
        data0: data?.viTriCongTac || '--',
        data1: data?.toChucCongTac || '--',
      };
    case 'quaTrinhDaoTao':
      return {
        data0: data?.tenTrinhDo || '--',
        data1: data?.namTotNghiep || '--',
      };
    case 'congTrinhApDung':
    case 'duAnChuTri':
    case 'duAnThamGia':
      return {
        data0: data?.tenCongTrinh || '--',
        data1:
          data?.thoiGianBatDau && data?.thoiGianKetThuc
            ? `${moment(data?.thoiGianBatDau).format('DD/MM/YYYY')} - ${moment(
                data?.thoiGianKetThuc,
              ).format('DD/MM/YYYY')}`
            : '--',
      };
    case 'giaiThuong':
      return {
        data0: data?.hinhThucVaNoiDung || '--',
        data1: data?.namTangThuong || '--',
      };
    case 'hoatDongKhac':
      return {
        data0: data?.tenSanPhamNCKH || '--',
        data1:
          data?.thoiGianBatDau && data?.thoiGianKetThuc
            ? `${moment(data?.thoiGianBatDau).format('DD/MM/YYYY')} - ${moment(
                data?.thoiGianKetThuc,
              ).format('DD/MM/YYYY')}`
            : '--',
      };
    // return {
    //   data0: data?.tenCongTrinh || '--',
    //   data1:
    //     data?.thoiGianBatDau && data?.thoiGianKetThuc
    //       ? `${moment(data?.thoiGianBatDau).format('MM/YYYY')} - ${moment(
    //           data?.thoiGianKetThuc,
    //         ).format('MM/YYYY')}`
    //       : '--',
    // };

    default:
      break;
  }
};
