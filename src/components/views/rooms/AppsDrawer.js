/*
Copyright 2015, 2016 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

const React = require('react');
const AddAppDialog = require('../dialogs/AddAppDialog');
const AppTile = require('../elements/AppTile');
const Modal = require("../../../Modal");

module.exports = React.createClass({
    displayName: 'AppsDrawer',

    propTypes: {
    },

    componentDidMount: function() {
        const as = this.state.apps;
        as.push({
            id: "bbcApp",
            url: "http://news.bbc.co.uk",
            name: "BBC News",
        });
        this.setState({apps: as});
    },

    getInitialState: function() {
        return {
            apps: [{
                id: "riot-bot",
                url: "https://matrix.org/_matrix/media/v1/thumbnail/matrix.org/LvHiqFMHWxAjFUMVCvaPbRYs?width=150&height=150",
                name: "Riot-bot",
            }],
        };
    },

    onClickAddWidget: function() {
        Modal.createDialog(AddAppDialog, {
            onFinished: (proceed, reason) => {
                if (!proceed) return;

                this.state.apps.push();
            },
        });
    },

    render: function() {
        const apps = this.state.apps.map(
            (app) => <AppTile key={app.id} url={app.url} name={app.name}/>);

        return (
            <div className="mx_AppsDrawer">
                <div id="apps" className="mx_AppsContainer">
                    {apps}
                </div>
                <div onClick={this.onClickAddWidget}
                    role="button"
                    tabIndex="0"
                    className="mx_AddWidget_button"
                    title="Add a widget">
                    [+] Add a widget
                </div>
            </div>
        );
    },
});