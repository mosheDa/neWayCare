import React from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right ,} from 'native-base';
import ImagePicker from 'react-native-image-picker'
import { strings } from '../locales/i18n';
import ActionButton from 'react-native-action-button';

export default class AddVideo extends React.Component {
    selectVideoTapped() {
        const options = {
          title: strings("addVideo.title"),
          takePhotoButtonTitle: strings("addVideo.takePhotoButtonTitle"),
          chooseFromLibraryButtonTitle:  strings("addVideo.chooseFromLibraryButtonTitle"),
          cancelButtonTitle: strings("addVideo.cancelButtonTitle"),
          mediaType: 'video',
          videoQuality: 'medium'
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
      
          if (response.didCancel) {
            console.log('User cancelled video picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            this.props.addVideo(response)
          }
        });
      }
  render() {
    return (
      
                <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => this.selectVideoTapped()}
              />
    );
  }
}