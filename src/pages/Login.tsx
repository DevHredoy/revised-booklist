// define types

// Landing page component

import { Form, Input } from "antd"
import "../App.css"

const onFinish = (values: any) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export const Login=()=>{

return(

    <div className="m-6 flex justify-center items-center min-h-screen">
      <div className="bg-slate-700 p-8 rounded-lg shadow-md w-full max-w-md">
    <Form   
        name="basic"
    labelCol={{ span: 8 }}  // Label takes 8/24 columns
          wrapperCol={{ span: 16 }} // Input takes 16/24 columns
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off">
        <Form.Item
        label="User Name"
        name="userName">
            <Input/>
        </Form.Item>
        <Form.Item label="Password" name="loginpass"><Input/></Form.Item>
        
    </Form>    </div>
   
</div>

)

}