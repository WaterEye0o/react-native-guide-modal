/**
 * @providesModule GuideModal
 * Created by whb on 2016/12/5.
 * https://github.com/WaterEye0o
 */

import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';

import {sleep} from '../../utils/util'

const {height, width} = Dimensions.get('window');
const DELAY_FOR_SHOW = 500;

export default class GuideModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      index: 0
    };
    this.total = 0;
    React.Children.forEach(this.props.children, (child)=>(child && this.total++))
    console.log(this.total,'total')
  }

  async show() {
    if (this.state.visible) return;

    await sleep(DELAY_FOR_SHOW)

    this.setState({
      visible: true
    });
  }

  close() {
    if (!this.state.visible) return;

    this.setState({
      visible: false
    });

  }

  nextVisible() {
    this.setState((state) => {
      if (state.index >= this.total - 1) {
        return {visible: false, index: 0};
      } else {
        return {index: state.index + 1};
      }
    })
  }

  onPress() {
    this.props.onPress && this.props.onPress();

    if (this.total && this.total > 1) {
      this.nextVisible();
    } else {
      this.close()
    }
  }

  render() {
    if (!this.state.visible) return null;

    return (
      <Modal
        animationType='none'
        transparent={true}
        visible={this.state.visible}
        {...this.props}
        onRequestClose={() =>{}}
      >
        <TouchableWithoutFeedback
          onPress={this.onPress.bind(this)}
        >
          <View
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)' }}
          >
            {this.total > 1 ? this.renderContent() : this.props.children}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  renderContent() {
    return this.props.children.filter((v, i)=> {
      return i <= this.state.index
    })
  }
}

function GuideModalItem(props) {
  const {
    ...others,
  } = props;
  return (
    <View {...others} style={props.style}>
      {props.children}
    </View>
  )
}

GuideModal.Item = GuideModalItem;

const styles = StyleSheet.create({});