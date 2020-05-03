import React, { Component } from 'react';
import styles from './Pictures.module.scss';

export default class Pictures extends Component {
    render () {
        return (
            <div className={styles.wrap}>
                <h1>Test App</h1>
                <div className={styles.row}>
                    {
                        this.props.images.map(image => {
                            return (
                                <img 
                                    alt='prop'
                                    src={image.url} 
                                    key={image.id}
                                    onClick={() => this.props.modalActive(image.id, image.url)}
                                />
                            )

                        })
                    }
                </div>
            </div>
        )
    }
}
