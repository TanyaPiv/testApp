import React, {Component} from 'react';
import './App.scss';
import Pictures from './components/Pictures';
import ModalWindow from './components/ModalWindow';
import 'normalize.css';

export default class App extends Component {
    state = {
        modalOpen: false,
        images: [],
        id: null,
        url: ''
    }

    modalActive = (id, url) => {
        this.setState({
            modalOpen: true,
            id: id,
            url: url
        })
        console.log(id, url)
    }
    
    onClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    getImages = async () => {
        try {
            const res = await fetch('https://boiling-refuge-66454.herokuapp.com/images');
            const data = await res.json();

            this.setState({
                images: data
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    componentDidMount() {
        this.getImages();
    }

    render () {
        return (
            <>
                <Pictures modalActive={this.modalActive} images={this.state.images}/>
                {
                    this.state.modalOpen 
                        ? <ModalWindow 
                            onClose={this.onClose} 
                            id={this.state.id} 
                            url={this.state.url}
                        /> 
                        : null
                }
            </>
        );
    }
};
