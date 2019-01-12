import React from 'react';
import  './config/fbConfig';

/**
 * Playerlist for adding and editing player information (first name, last name, player number)
 */
export default class PlayerList extends React.Component {

    const firebaseApp = params.fb;
        this.db = firebaseApp.database();
        this.state = { players: []};
    }

        
    /* Arrange players in ascending order by playernumber */
    bubbleSort = (a) => {
        let swapp = false;
        let n = a.length-1;
        const x=a;
        do {
            swapp = false;
            for (let i=0; i < n; i++) {
                if (parseInt(x[i].playernumber) > parseInt(x[i+1].playernumber))
                {
                    let temp = x[i];
                    x[i] = x[i+1];
                    x[i+1] = temp;
                    swapp = true;
                }
            }
            n--;
        } while (swapp);
        return x; 
    }

    

    componentDidMount() {
        this.getPlayers();
    }

    editPlayer = (id) => {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        navigate('EditPlayer', {player: id, fb: params.fb} );
    }

    addPlayer = () => {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        navigate('AddPlayer', {fb: params.fb });
    }

    renderItem = ({item}) =>
        <View style={styles.playerlistrow} >
            <Avatar
                small
                rounded
                title={item.playernumber}/>
            
            <View style={styles.nameBox}>    
                <Text style={styles.nameItem}>{item.firstname}</Text>
                <Text style={styles.nameItem}>{item.lastname}</Text>
            </View>
            <Icon 
                raised
                name='edit'
                containerStyle = {{backgroundColor: '#4682B4'}}
                color='#ffffff'
                size={14}
                onPress={() => this.editPlayer(item.id)} />
        </View>;

    render () {

        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{ text: 'MANAGE TEAM', style: { color: '#ffffff' } }}
                    backgroundColor='#990000'/>
            <View style={styles.flatlistcontainer}>
                <FlatList
                    data = {this.state.players}
                    keyExtractor = {item => item.id}
                    renderItem = {this.renderItem}
                    style={{marginTop: 5}}/>
            </View>

            <View style={styles.buttonlist}>
            <Button
                title='ADD PLAYER'
                buttonStyle={styles.button}
                containerViewStyle={styles.buttonContainer}
                onPress={() => this.addPlayer()}/>  
            <Button
                title='HOME'
                buttonStyle={styles.button}
                containerViewStyle={styles.buttonContainer}
                onPress={() => this.goHome()} />
            </View>
            </View>
        );
    }
}
