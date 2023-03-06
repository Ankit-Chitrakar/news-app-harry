import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        pageSize: 9,
        category: 'general',
        country: 'us',
        setProgress: 0,
        apiKey: ''
    }
    static propsTypes = {
        pageSize: PropTypes.number,
        category: PropTypes.string,
        country: PropTypes.string,
        setProgress: PropTypes.number,
        apiKey: PropTypes.string
    }

    capitalized(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props){
        super(props);
        console.log('Hello')
        this.state = {
            articles: [],
            loading: false
        }
        document.title = `${this.capitalized(this.props.category)} - News Monkey 🚀`
    }

    async componentDidMount(){
        // let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=8f7cb01510fc4175b113bf3bc6c4bd5c&pageSize=${this.props.pageSize}`
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        this.props.setProgress(40)
        let parseData = await data.json()
        this.props.setProgress(70)
        console.log(parseData)
        this.setState({
            articles: parseData.articles,
            page: 1,
            totalResults: parseData.totalResults,
            loading:false
        })
        this.props.setProgress(100)
    }
    
    // updatNews(){

    // }

    handlePrevClick = async()=>{
        console.log('Previous')
        // let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=8f7cb01510fc4175b113bf3bc6c4bd5c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        this.props.setProgress(40)
        this.setState({loading:true})
        let parseData = await data.json()
        this.props.setProgress(70)
        console.log(parseData)
        this.setState({
            page: this.state.page -1,
            articles: parseData.articles,
            loading:false
        })
        this.props.setProgress(100)
    }
    handleNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
        }
        else {
            this.props.setProgress(10)
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data = await fetch(url);
            this.props.setProgress(40)
            let parsedData = await data.json()
            this.props.setProgress(70)
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
            this.props.setProgress(100)
        }
    }

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{letterSpacing: '3px', fontWeight: 700, marginTop: '80px'}}>News Monkey - Top {this.capitalized(this.props.category)} Headlines</h1>
        {this.state.loading &&<Spinner/>}
        <div className="row container">
            {!this.state.loading && this.state.articles && this.state.articles.map((element)=>{
                return <div className="col-md-4 my-4" key={element.url} style={{letterSpacing: '1px', fontWeight: 600}}>
                    <NewsItem newsTitle={!element.title?'This is Title':element.title} description={!element.description?'This is Description':element.description} urlImage={!element.urlToImage?'https://techcrunch.com/wp-content/uploads/2023/03/FIGURE01_Humanoid_1.jpg?resize=1200,960':element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;
                Previous</button>
            <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News