import React, { useState, useEffect } from 'react';
import { LeftOutlined, CheckCircleFilled } from '@ant-design/icons';
import cls from './index.module.less';
import { Pagination, Checkbox, Modal, message } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import marketCtrl from '@/ts/controller/store/marketCtrl';
import userCtrl from '@/ts/controller/setting/userCtrl';
import { Adata } from './moke';
import { Col, Row, Tag } from 'antd';
import Header from './component/hearde';
import Content from './component/content';
const ShoppingCart: React.FC<any> = (props) => {
  const [fls, setfls] = useState([]); //接口内的数据
  const [checkval, setcheckval] = useState([]); //勾选的数组
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const { confirm } = Modal;
  const [messageApi, contextHolder] = message.useMessage();
  console.log(userCtrl.Space);
  // console.log(Provider.isUserSpace());
  console.log(userCtrl.User);

  useEffect(() => {
    marketCtrl.Market.getStaging(false).then((res: any) => {
      //获取购物车
      console.log(res);
      setfls(res);
    });
  }, []);
  // console.log(settingCtrl.getCurWorkSpace);//空间
  // console.log(settingCtrl.getPerson);

  // const marketCtrl = new MarketController(settingCtrl.getCurWorkSpace);

  const showConfirms = (type: string) => {
    //弹窗
    return () => {
      if (checkval.length == 0) {
        message.warning('请先勾选一个应用');
        console.log('没有勾选');
        return;
      } else if (type == 'add') {
        //购买
        confirm({
          title: '确认订单',
          icon: <CheckCircleFilled className={cls['icon1']} />,
          content: '此操作将生成交易勾选订单。是否确认?',
          onOk() {
            console.log('OK', checkval);
            //另一段测试
            // let fsdata = fls;
            // let d = [];
            // checkval.forEach((v) => {
            //   fsdata.forEach((val, i) => {
            //     if (v == val.id) {
            //       fsdata.splice(i, 1);
            //     }
            //     setfls(fsdata);
            //   });
            // });

            // console.log(fsdata);
            // let fs = fls;

            let fs = JSON.parse(JSON.stringify(fls)); //勾选的做判断
            console.log(fs);
            checkval.forEach((v) => {
              fs = fs.filter((val: any) => {
                return val.id != v;
              });
              setfls(fs);
            });
            messageApi.open({
              type: 'success',
              content: '购买成功',
            });
            setcheckval([]);
            setCheckAll(false);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      } else if (type == 'rm') {
        //删除
        confirm({
          title: '确认订单',
          icon: <CheckCircleFilled className={cls['icon1']} />,
          content: '此操作将生成交易订单。是否确认?',
          onOk() {
            console.log('OK', checkval);
            checkval.forEach((item) => {
              marketCtrl.Market.deleteStaging(item).then((res) => {
                console.log(res);
              });
            });
            marketCtrl.Market.getStaging(false).then((res: any) => {
              //获取购物车
              console.log(res);
              setfls(res);
              messageApi.open({
                type: 'success',
                content: '删除成功',
              });
            });

            setcheckval([]);
            setCheckAll(false);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    };
  };
  const plainOptions: any = [];
  fls.forEach((item: any) => {
    plainOptions.push(item.id);
  });
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    console.log(e.target.checked);

    if (e.target.checked == true) {
      setcheckval(plainOptions);
    } else {
      setcheckval([]);
    }
    // setcheckval(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    console.log(checkval);
  };
  return (
    <>
      {contextHolder}
      <div className={cls['maxbox']}>
        <Header showConfirms={showConfirms} fatherprops={props} />
        <div className={cls['content']}>
          <div className={cls['content_head']}>
            <Row className={cls['content_head_top']}>
              <Col span={8} className={cls['content_head_top1']}>
                商品信息
              </Col>
              <Col span={3}>归属人</Col>
              <Col span={3}>售卖权属</Col>
              <Col span={3}>价格</Col>
              <Col span={3}>使用期限</Col>
              <Col span={4}>
                全选
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                />
              </Col>
            </Row>
          </div>
          <div className={cls['content_mod']}>
            <Checkbox.Group
              value={checkval}
              className={cls['content_mods']}
              onChange={(checkedValues: any) => {
                console.log('checked = ', checkedValues);
                setcheckval(checkedValues);
                setCheckAll(checkedValues.length === plainOptions.length);
                // setIndeterminate(
                //   checkval.length != 0 && checkval.length < plainOptions.length,
                // );
              }}>
              {fls.map((item, i) => {
                return (
                  <div key={i}>
                    <Content
                      item={item}
                      i={i}
                      fls={fls}
                      setcheckval={setcheckval}
                      checkval={checkval}
                    />
                    {/* <div className={cls['content_body']} key={i}>
                    <Row>
                      <Col span={8}>
                        <div>
                          <img
                            src="data:image/png;base64,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"
                            alt=""
                            className={cls['boximg']}
                          />
                          <div className={cls['boximgwz']}>
                            <span className={cls['boximgwz1']}>
                              {item.merchandise.caption}
                            </span>
                            <span className={cls['boximgwz2']}>版本：0.01 </span>
                            <div>
                              应用描述:
                              {item.merchandise.information
                                ? item.merchandise.information
                                : '暂无描述'}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className={cls['lab2']}>林查查</div>
                      </Col>
                      <Col span={3}>
                        <div className={cls['lab3']}>{item.merchandise.sellAuth}</div>
                      </Col>
                      <Col span={3}>
                        <div className={cls['lab4']}>
                          {item.merchandise.price
                            ? '￥' + item.merchandise.price
                            : '￥0,00'}
                        </div>
                      </Col>
                      <Col span={3}>
                        <div className={cls['lab5']}>
                          <Tag color="processing">
                            {item.merchandise.days
                              ? item.merchandise.days + '天'
                              : '无说明'}
                          </Tag>
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className={cls['lab6']}>
                          <Checkbox
                            autoFocus
                            value={fls[i].id}
                            onChange={(e: CheckboxChangeEvent) => {
                              console.log(`checked = ${e.target.checked}`);
                              // setIndeterminate(
                              //   checkval.length != 0 &&
                              //     checkval.length < plainOptions.length,
                              // );
                            }}>
                            勾选
                          </Checkbox>
                        </div>
                      </Col>
                    </Row>
                  </div> */}
                  </div>
                );
              })}
            </Checkbox.Group>
          </div>
        </div>
        <div className={cls['botton']}>
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
