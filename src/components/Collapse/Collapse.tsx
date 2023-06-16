import React, {  } from 'react';
import { Collapse, theme } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

interface CollapseProps{
    key: string | number
    header: string
    children: React.ReactNode
    autoOpen?: boolean
}

const CustomCollapse: React.FC<CollapseProps> = ({header, children , autoOpen, key}) => {
    
    

    const { token } = theme.useToken();

    const panelStyle = {
        border: 'none',
        borderRadius: token.borderRadiusLG,
    };
    return (
    <>
        <Collapse
            defaultActiveKey={autoOpen ? 1 : key}
            expandIconPosition={"end"}
            size='large'
            className='w-full border-white shadow-xl'
            ghost
            expandIcon={({isActive})=> autoOpen ? <></> : <DownOutlined rotate={isActive? 0 : 270} className='text-btnColor'/>}
            >
            <Panel
                key={autoOpen ? 1 : key}
                header={<div className='flex space-x-3'><div className='max-h-full w-4 mt-1 bg-primary-100 rounded-xl'></div><h3 className="text-3xl font-normal text-primary-100">{header}</h3></div>}
                style={panelStyle}
                className="bg-white overflow-hidden"
            >
                <div>{children}</div>
            </Panel>
        </Collapse>
    </>
    );
};

export default CustomCollapse;