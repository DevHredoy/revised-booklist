// define types

// Landing page component

import { Form } from "antd"
import "../App.css"

const onFinish = (values: any) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export const Login=()=>{

return(
<div>
    <div className="m-6">
        <Form
        name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off">
        <Form.Item
        label="User Name"
        name="userName">
            <input/>
        </Form.Item>
        <Form.Item label="Password" name="loginpass"><input></input></Form.Item>
        
    </Form>
    </div>
   
</div>

)

}