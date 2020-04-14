import React  from "react";

class MemeGenerator extends React.Component {

    constructor() {
        super()
        this.state = {
            topText: '',
            bottomText: '',
            ramdomImgUrl: 'https://i.imgflip.com/1bij.jpg',
            allMemes: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({ allMemes: memes })
        })
    }
    handlesubmit(event) {
        event.preventDefault()
        let randomImgIndex = Math.floor(Math.random()*this.state.allMemes.length)
        
        this.setState({ramdomImgUrl: this.state.allMemes[randomImgIndex].url})
        
    }
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return (
            <div>
                <div className="App-content">
                    <form onSubmit={this.handlesubmit}>
                        <input value={this.state.topText} className="input" type="text" name="topText" placeholder="Top Text" onChange={this.handleChange}/>
                        <input value={this.state.bottomText} className="input" type="text" name="bottomText" placeholder="Bottom Text" onChange={this.handleChange}/>
                        <button className="button">Generate</button>
                    </form>
                </div>
                <div className="App-content container">
                   <img src={this.state.ramdomImgUrl} alt=""/>
                   <div className="img-top">{this.state.topText}</div>
                   <div className="img-bottom">{this.state.bottomText}</div>
                </div>
            </div>

        )
    }
        
    
}

export default MemeGenerator