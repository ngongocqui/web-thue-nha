import React, { Component } from 'react'
import { Modal, Button, notification } from 'antd';
import fetchData from '../api/api'
import to from 'await-to-js'

export default class ModalHuyThueNha extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: "",
            taiKhoan: ""
        }
    }

    setData = (id, taiKhoan) => {
        this.setState({id, taiKhoan})
    }

    handleHuy = async() => {
        let [err, result] = await to(fetchData.huythuenha(this.state.id, this.state.taiKhoan))

        if (err) notification.open({ message: "Lỗi huỷ!!!", description: `${err}` })

        if (result && result.message) notification.open({ message: "Thông báo", description: `${result.message}` })
        
        this.props.closeModalHuy()
        this.props.getAll(0, 10000, 3)
    }

    render() {
        let { isModalHuy } = this.props
        let { taiKhoan } = this.state

        return (
            <Modal
                title={"Huỷ"}
                visible={isModalHuy}
                onOk={this.props.closeModalHuy}
                onCancel={this.props.closeModalHuy}
                footer={[
                    <Button type="default" onClick={this.handleHuy}>
                      Xác nhận
                    </Button>,
                    <Button type="default" onClick={this.props.closeModalHuy}>
                      Huỷ
                    </Button>,
                  ]}
                  style={{textAlign: "center"}}
                >
                    {`Bạn chắc chắn muốn huỷ nhà được tài khoản ${taiKhoan} này thuê không?`}
            </Modal>
        )
    }
}
