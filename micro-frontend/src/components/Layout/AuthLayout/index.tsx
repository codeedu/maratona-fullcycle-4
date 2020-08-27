// @flow 
import * as React from 'react';
import { LeftSide } from './LeftSide';
type Props = {
    
};
export const AuthLayout:React.FC<Props> = (props) => {
    return (
        <div className='content'>
            <LeftSide/>
            {props.children}
        </div>
    );
};