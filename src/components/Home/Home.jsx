import React, { Component } from 'react';
import {
  Container,
  Grid,
  Segment,
  Header,
  Menu,
  Label,
  Card,
  Image,
  Button,
} from 'semantic-ui-react';
import sample_data from './../../assets/icons_with_labels.json';
import $ from 'jquery';

import styles from './Home.scss';

const color_names = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown'
];

class Home extends Component {
  constructor(props) {
    super(props);

    let section_names = [];

    const keys = Object.keys(sample_data);
    for (var i = 0; i < Object.keys(sample_data).length; i++) {
      section_names.push({
        name: keys[i],
        count: sample_data[keys[i]].length
      });
      for (var j = 0; j < sample_data[keys[i]].length; j++) {
        const icon_result = sample_data[keys[i]][j];
      }
    }

    this.state = {
      activeItem: 'shop',
      data: {},
      display_list: [],
      current_page: 0,
      section_list: section_names
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleLoadMoreResult = this.handleLoadMoreResult.bind(this);
  }

  componentWillMount() {
    const { activeItem } = this.state;
    const piles = sample_data[activeItem];
    const start_idx = 0;
    let end_idx = start_idx + 10;
    if (end_idx > piles.length) {
      end_idx = piles.length;
    }
    let list = [];
    for (var i = start_idx; i < end_idx; i++) {
      list.push(piles[i]);
    }
    this.setState({
      display_list: list
    });
  }

  handleItemClick(event, { name }) {
    const piles = sample_data[name];
    const start_idx = 0;
    let end_idx = start_idx + 10;
    if (end_idx > piles.length) {
      end_idx = piles.length;
    }
    let list = [];
    for (var i = start_idx; i < end_idx; i++) {
      list.push(piles[i]);
    }
    this.setState({
      activeItem: name,
      display_list: list,
      current_page: 0,
    });
	$('html, body').animate({ scrollTop: 0 }, 'fast');
  }

  handleLoadMoreResult(event) {
    const { activeItem, current_page } = this.state;
    const piles = sample_data[activeItem];
    const start_idx = (current_page + 1) * 10;
    let end_idx = start_idx + 10;
    if (end_idx > piles.length) {
      end_idx = piles.length;
    }
    let list = [];
    for (var i = start_idx; i < end_idx; i++) {
      list.push(piles[i]);
    }
    this.setState({
      current_page: current_page + 1,
      display_list: list,
    });
	$('html, body').animate({ scrollTop: 0 }, 'fast');
  }

  render() {
    const { activeItem, section_list, current_page, display_list } = this.state;

    const icom_img_abs_path = '/Users/jasonsitu/Desktop/sample-icon.png';
    const icom_img_path = '/assets/img/sample-icon.png';
    const screen_img_path = '/assets/img/sample-screen.jpg';
    const screen_img = '/assets/sample-screen.jpg';
    const icon_img = '/assets/sample-icon.png';
    const sample_list = [
      {icon_path: icom_img_path, screenshot: screen_img_path, label: 'label-A'},
      {icon_path: icon_img, screenshot: screen_img, label: 'label-B'}
    ];

    const last_page = (current_page + 1) === Math.ceil(sample_data[activeItem].length / 10) ;

    return (
      <Container className='ResultViewer'>
        <Segment raised>
          <Header
            as='h3'
            textAlign='center'
            >
            { "Icons' Classification Evaluation" }
          </Header>
        </Segment>
        <Grid
          className='main'
          columns='equal'
          >
          <Grid.Column>
            <Menu vertical>
              {
                section_list.map((section, index) => {
                  let color = 'green';
                  if (section.count > 100) {
                    color = 'teal';
                  }
                  if (section.count > 200) {
                    color = 'blue';
                  }
                  if (section.count > 500) {
                    color = 'violet';
                  }
                  if (section.count > 600) {
                    color = 'brown';
                  }
                  if (section.count > 800) {
                    color = 'yellow';
                  }
                  if (section.count > 1000) {
                    color = 'orange';
                  }
                  if (section.count > 2000) {
                    color = 'pink';
                  }
                  if (section.count > 3000) {
                    color = 'red';
                  }

                  return (
                    <Menu.Item
                      key={index}
                      name={section.name}
                      active={activeItem === section.name}
                      onClick={this.handleItemClick}
                      >
                      <Label color={color}>
                        {section.count}
                      </Label>
                      {section.name}
                    </Menu.Item>
                  );
                })
              }
            </Menu>

          </Grid.Column>

          <Grid.Column
            className='screen-icon'
            width={12}
            >
            {
              display_list.map((item, index) => {
                return (
                  <Segment key={ index } className='result-item'>
                    <Grid>
                      <Grid.Column
                        className='result-screen'
                        floated='left'
                        width={8}
                        >
                        <Image src={ item.screenshot } />
                      </Grid.Column>
                      <Grid.Column
                        className='result-icon'
                        floated='right'
                        width={8}
                        verticalAlign='middle'
                        textAlign='center'
                        >
                        <Image src={ item.icon_path } />
                        <Label
                          basic
                          pointing
                          color='red'
                          size='large'
                          >
                          { item.label }
                        </Label>
                      </Grid.Column>
                    </Grid>
                  </Segment>
                );
              })
            }
            <Button
              fluid
              disabled={ last_page }
              onClick={ this.handleLoadMoreResult }
              >
              Load Next 10 Items
            </Button>
          </Grid.Column>
        </Grid>

      </Container>
    );
  }
}

export default Home;
