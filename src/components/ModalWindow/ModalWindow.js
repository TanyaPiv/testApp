import React, { Component} from 'react';
import styles from './ModalWindow.module.scss';

export default class ModalWindow extends Component {
    state = {
        comments: [],
        form: {
            firstName: '',
            comment: ''
        }
    }

    onInputChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { firstName, comment } = this.state.form;
        const data = { 
            name: firstName,
            comment: comment
        }
        
        const newComment = { 
            date: new Date(),
            text: comment,
            id: `f${(~~(Math.random() * 1e8)).toString(16)}`
        }

        this.setState({
            comments: this.state.comments.concat(newComment)
        })
        
        this.postComment(data);
    }

    postComment = async (data) => {
        try {
            const request = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${this.props.id}/comments`, {
                method: 'POST',
                contentType: 'application/json',
                body: JSON.stringify(data)
            });

            console.log(request)


        } catch (error) {
            console.error(error.message)
        }
    }

    getImage = async () => {
        try {
            const result = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${this.props.id}`)
            const data = await result.json();

            this.setState({
                comments: data.comments
            })

            console.log(data.comments)
        } catch (error) {
            console.error(error.message)
        }
    }

    componentDidMount () {
        this.getImage();
    }


    render() {
        return (
            <>
                <div className={styles.back} onClick={this.props.onClose}></div>
                <div className={styles.modal}>
                    <div className={styles.wrap}>
                        <form className={styles.form} onSubmit={this.onSubmit}>
                            <img
                                alt=''
                                src={this.props.url}
                            />
                            <input name='firstName' type="text" placeholder='Ваше Имя' onChange={this.onInputChange} />
                            <input name='comment' type="text" placeholder='Ваш комментарий' onChange={this.onInputChange} />
                            <button type='submit'>Оставить комментарий</button>
                        </form>
                        <div className={styles.comments}>
                            {
                                this.state.comments.map(comment => {
                                    const date = new Date(comment.date).toLocaleDateString();
                                    return (
                                        <div key={comment.id} className={styles.comment}>
                                            <p>{date}</p>
                                            <span>{comment.text}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.close} onClick={this.props.onClose}>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                    </div>
                </div>
            </>
        )
    }
}
