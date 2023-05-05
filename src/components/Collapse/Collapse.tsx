import React, {  } from 'react';
import { Collapse, theme } from 'antd';

const { Panel } = Collapse;

interface CollapseProps{
    key: string | number
    header: string
    children: React.ReactNode
}

const CustomCollapse: React.FC<CollapseProps> = ({header, children , key}) => {
    
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const { token } = theme.useToken();

    const panelStyle = {
        border: 'none',
        borderRadius: token.borderRadiusLG,
    };
    return (
    <>
        <Collapse
            defaultActiveKey={key}
            onChange={onChange}
            expandIconPosition={"end"}
            size='large'
            className='w-full border-white'
            >
            <Panel
                key={key}
                header={<div className='flex space-x-3'><div className='max-h-full w-4 mt-1 bg-primary-100 rounded-xl'></div><h3 className="text-3xl font-normal text-primary-100">{header}</h3></div>}
                style={panelStyle}
                className="bg-white overflow-hidden"
            >
                
                <div className=''>{children}</div>
            </Panel>
            </Collapse>
    </>
    );
};

export default CustomCollapse;