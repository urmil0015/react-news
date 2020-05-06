import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';


class App extends React.Component{
    
    constructor(){
        super();
        this.state = {
            article: '',
            author: '',
            country: '',
            category: '',
            countries: {
    "AR": "Argentina",
    "AU": "Australia",
    "AT": "Austria",
    "BE": "Belgium",
    "BR": "Brazil",
    "BG": "Bulgaria",
    "CA": "Canada",
    "CN": "China",
    "CO": "Colombia",
    "CU": "Cuba",
    "CZ": "Czechia",
    "EG": "Egypt",
    "FR": "France",
    "PF": "French Polynesia",
    "DE": "Germany",
    "GR": "Greece",
    "VA": "Holy See (the)",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IN": "India",
    "ID": "Indonesia",
    "IE": "Ireland",
    "IL": "Israel",
    "IT": "Italy",
    "JP": "Japan",
    "KR": "Korea (the Republic of)",
    "LV": "Latvia",
    "LT": "Lithuania",
    "MY": "Malaysia",
    "MX": "Mexico",
    "FM": "Micronesia (Federated States of)",
    "MA": "Morocco",
    "NL": "Netherlands (the)",
    "NZ": "New Zealand",
    "NG": "Nigeria",
    "NO": "Norway",
    "PH": "Philippines (the)",
    "PL": "Poland",
    "PT": "Portugal",
    "RO": "Romania",
    "RU": "Russian Federation (the)",
    "VC": "Saint Vincent and the Grenadines",
    "SA": "Saudi Arabia",
    "RS": "Serbia",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "ZA": "South Africa",
    "SE": "Sweden",
    "CH": "Switzerland",
    "TW": "Taiwan (Province of China)",
    "TH": "Thailand",
    "TR": "Turkey",
    "UA": "Ukraine",
    "AE": "United Arab Emirates (the)",
    "GB": "United Kingdom of Great Britain and Northern Ireland (the)",
    "US": "United States of America (the)",
    "VE": "Venezuela (Bolivarian Republic of)",
            },
        categories: [
            "Business",
            "Entertainment",
            "general",
            "health",
            "science",
            "sports",
            "technology"
        ],
            go: false
        }
        
        this.clicked = this.clicked.bind(this);
        this.letsgo = this.letsgo.bind(this);
        this.countryList = this.countryList.bind(this);
        this.categoryList = this.categoryList.bind(this);
    }
    
    
    
    
    
    componentDidMount(){
        /*fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=eb90e2f918374d6d9ba52341a945be40")
        .then(response => response.json())
        //.then(resp => console.log(resp.articles))
        .then(resp => this.setState({
            articles: resp
        }))*/
    }
    
    clicked(){
        if(this.state.go == true){
        fetch("https://newsapi.org/v2/top-headlines?country="+this.state.country+"&category="+this.state.category+"&apiKey=eb90e2f918374d6d9ba52341a945be40")
        .then(response => response.json())
        //.then(resp => console.log(resp.articles))
        .then(resp => this.setState({
            article: resp
        }))
        } else {
            alert("Select a country and/or category first");
        }
    }
    
    letsgo(){
        this.setState({
            go: true
        })
    }
    
    
    countryList(){
        let countries = [];
        let country_keys = Object.entries(this.state.countries);
        console.log(country_keys[0][0])
        for(let i = 0; i < country_keys.length; i++){
            countries.push(<MenuItem value={country_keys[i][0]}>{country_keys[i][1]}</MenuItem>
        )
        }
        return countries;
    }
    
    
    categoryList(){
        let categories = [];
        console.log(this.state.categories.length);
        for(let i = 0; i < this.state.categories.length; i++){
            categories.push(<MenuItem value={this.state.categories[i]}>{this.state.categories[i]}</MenuItem>
        )
        }
        return categories;
    }
    
    componentDidUpdate(){
        
        console.log(Object.keys(this.state.countries).length);
        
        
        let card_styles = {
            /*backgroundColor: '#eee',*/ color: 'blue', /*width: '23em', height: '35em', margin: '1em', padding: '0.5em', display: 'inline-block', overflow: 'scroll'*/}
        
        let pic_styles = {
            width: '21em', height: '15em', paddingLeft: '-0.5em'
        }
        
        //alert(typeof(this.state.articles.totalResults))
        //alert(this.state.articles.articles[0].author);
        //console.log(this.state.article.articles[0].author);
        if(this.state.go == true){
        let total = this.state.article.totalResults;
        let articles = [];
        let i;
        for(i = 0; i < total; i++){
            //console.log
            if(this.state.article.articles[i] != null && this.state.article.articles[i].author != null){
            articles.push(/*<div className="card_styles">*/ <Card class="cards" style={card_styles}> <CardContent><h2> {this.state.article.articles[i].author}</h2> 
                          <h4> {this.state.article.articles[i].title} </h4>
                          <img src={this.state.article.articles[i].urlToImage} style={pic_styles} />
                          <p> {this.state.article.articles[i].content} </p>
                          <Button href={this.state.article.articles[i].url} target="blank">Learn more</Button>
                          </CardContent>
                          </Card>
                          /*</div>*/
                         )
                          }
        }
        return articles;
        }
    }
    
    

    
    render(){
        
        
        
        
        
        
        const handleChange = (event) => {
            console.log(event.target.name)
            this.setState({
                country: event.target.value
            })
            this.setState({
            go: true
        })
  };
        
        const handleCategory = (event) => {
            console.log(event.target.name)
            this.setState({
                category: event.target.value
            })
            this.setState({
            go: true
        })
  };
        
        
        let formControl = {
            //margin: theme.spacing(1),
            minWidth: 120,
        }
        
        const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
        
        
        console.log(this.state.article)
        //console.log(this.state.articles);
        return(
            
        <div>
            <div style={{width: "80%", marginLeft: "10em"}}>
            <Grid container spacing={4} direction="row" justify="center" alignItems="center" style={{ marginBottom: "3em"}}>
            
            <Grid item lg={4}>
            <FormControl style={{width: '15em'}} name="country">
            <InputLabel id="demo-simple-select-filled-label">Select a Country</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled"
          onChange={handleChange}  > 
            
            
            {this.countryList()}
            </Select>
            </FormControl>
            </Grid>

            <Grid item lg={4}>
            <FormControl style={{width: '15em'}}>
            <InputLabel id="demo-simple-select-filled-label">Select a category</InputLabel>
            <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled"
          onChange={handleCategory} name="category" > 
            
            {this.categoryList()}
            </Select>
            </FormControl>
            </Grid>
            </Grid>

            <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                
                <Grid item lg={2} />
                
                <Grid item lg={5}>
            <Button variant="contained" color="primary" style={{width:"12em"}} onClick={this.clicked}>Load data</Button>
                </Grid>
            </Grid>

</div>
            <div style={{marginLeft: "3em"}}>
            {this.componentDidUpdate()}
            </div>
                        
        </div>    
        )
    }
    
}

export default App;
