
var headers = [
    "Book", "Author", "Language", "Published", "Sales"
];
var data = [
    ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954–1955", "150 million"],
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],
    ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754–1791", "100 million"],
    ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
    ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
];


var Excel = React.createClass({
    displayName: "Excel",

    getInitialState: function () {
        return {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // {row: index, cell: index}
            search: false,
        };
    },
    _sort: function (e) {
        var column = e.target.cellIndex;
        var data = this.state.data.slice(); // or `Array.from(this.state.data)` in ES6
        var descending = this.state.sortby === column && !this.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1)

        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending
        })
    },
    _showEditor: function (e) {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex
            }
        })
    },
    _save: function (e) {
        e.preventDefault();
        var input = e.target.firstChild;
        var data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;

        this.setState({
            edit: null, // done editing
            data: data,
        });
    },
    _toggleSearch() {
        if (this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: false,
            });
            this._preSearchData = null;
        } else {
            this._preSearchData = this.state.data;
            this.setState({
                search: true,
            });
        }
    },
    _preSearchData: null,
    _search: function (e) {
        console.log("searchng");
        var needle = e.target.value.toLowerCase();
        if (!needle) { // the search string is deleted
            this.setState({ data: this._preSearchData });
            return;
        }
        var idx = e.target.dataset.idx; // which column to search
        var searchdata = this._preSearchData.filter(function (row) {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({ data: searchdata });
    },
    render: function () {
        return (
            React.DOM.div(null,
                this._renderToolbar(),
                this._renderTable()
            )
        );
    },
    _renderToolbar: function () {
        return React.DOM.button({
            onClick: this._toggleSearch,
            className: 'toolbar',
        }, 'Search');
    },
    _renderSearch: function () {
        if (!this.state.search) {
            return null;
        }
        return (
            React.DOM.tr({ onChange: this._search },
                this.props.headers.map(function (_ignore, idx) {
                    return React.DOM.td({ key: idx },
                        React.DOM.input({
                            type: 'text',
                            'data-idx': idx,
                        })
                    );
                })
            )
        );
    },
    _renderTable: function () {
        return (
            React.DOM.table(null,
                React.DOM.thead({ onClick: this._sort },
                    React.DOM.tr(null,
                        this.props.headers.map(function (eachElement, index) {
                            if (this.state.sortby === index) {
                                eachElement += this.state.descending ? "\u2191" : "\u2193"
                            }
                            return React.DOM.th({ key: index }, eachElement)
                        }, this)
                    )
                ),
                React.DOM.tbody({ onDoubleClick: this._showEditor },
                    this._renderSearch(),
                    this.state.data.map(function (eachElement, rowIndex, wholeArray) {
                        return (
                            React.DOM.tr({ key: rowIndex },
                                eachElement.map(function (eachElement, index, wholeArray) {

                                    var content = eachElement;
                                    var edit = this.state.edit;

                                    console.log("state: ", edit);

                                    console.log(edit && edit.row === rowIndex && edit.cell === index);
                                    if (edit && edit.row === rowIndex && edit.cell === index) {
                                        content = React.DOM.form({ onSubmit: this._save },
                                            React.DOM.input({
                                                type: 'text',
                                                defaultValue: content,
                                            })
                                        );
                                    }

                                    return React.DOM.td({
                                        key: index,
                                        "data-row": rowIndex
                                    }, content);
                                }, this)
                            )
                        );
                    }, this)
                )
            )
        )
    }
});

ReactDOM.render(
    React.createElement(Excel, {
        headers: headers,
        initialData: data
    })
    , document.getElementById("root"));