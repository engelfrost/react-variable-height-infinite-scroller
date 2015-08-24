var React = require('react');
var InfiniteScroller = require('./InfiniteScroller.js');
// var fakeRows = [3,35,369,37,38,39,40,41,42,4388,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67, 123,188,12,122,616,234,636,755,432,112,443,69,77,88,89,99,111,222,333,444,55,555,6654];
function getFakeRowsWithHeights (numberOfRows) {
   var newFakeRows = [];
   for (var i = 0; i < numberOfRows; i++) {
     newFakeRows.push({height: Math.floor(1000*Math.random())});
   }
   return newFakeRows;
 }

var App = React.createClass({
  getNewRandomRow: function (totalRows) {
    return {row: Math.floor(totalRows * Math.random())};
  },

  getInitialState: function() {
    return {
      rowToJumpTo: null,
      newRowToJumpTo: this.getNewRandomRow(100),
      fakeRows: getFakeRowsWithHeights(100)
    };
  },
  render: function () {
    var self = this;
    function renderRow (rowNumber) {
        var a = 0;
        // for (var i = 0; i < 1000000; i++) { //uncomment this code to simulate a complicated row rendering
        //     a++;
        // }
        var heightOfRow = self.state.fakeRows[rowNumber].height;
        return (
            <div 
                key={rowNumber} 
                style={{height: heightOfRow, background: heightOfRow % 2 === 0 ? 'red' : 'orange'}}
                > 
                {heightOfRow}
            </div>);
    }
    console.log('hey');
    var newNumberOfRowsToDisplay = Math.floor(Math.random()*200);
    return (
      <div overflow='scroll'>
        <button onClick={function (argument) {
          self.setState({
            rowToJumpTo: self.state.newRowToJumpTo,
            newRowToJumpTo: self.getNewRandomRow(self.state.fakeRows.length)
            // newRowToJumpTo: self.getNewRandomRow()
          });
        }}>
          Jump to a random row: Row #{self.state.newRowToJumpTo.row} (its height is {self.state.fakeRows[self.state.newRowToJumpTo.row].height})
        </button>
        <button onClick={function (argument) {
          self.setState({
            fakeRows: getFakeRowsWithHeights(newNumberOfRowsToDisplay),
          });
        }}>
          Create {newNumberOfRowsToDisplay} new rows
        </button>
        <InfiniteScroller
              averageElementHeight={100} //this is a guess you make!
              containerHeight={600}
              rowToJumpTo={this.state.rowToJumpTo} //(optional) row you want to jump to. Must be passed as a new object each time to allow for difference checking 
              renderRow={renderRow} //function to render a row
              totalNumberOfRows={self.state.fakeRows.length} //an array of data for your rows
              preloadRowStart={10} //if you want to start at a particular row to begin with
              />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('container'));