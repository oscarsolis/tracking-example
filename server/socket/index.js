const mongoose = require('mongoose');
const Point = mongoose.model('Point');
const socketEvents = require('../config/socket-events');

module.exports = (server, next) => {

	const io = require('socket.io')(server);

	global.socketIO = io;

	io.on(socketEvents.on.connection, socket => {
		console.log('connection in socket');

		socket.on(socketEvents.on.disconnect, () => {
			console.log('socket disconnected');
		});

		socket.on(socketEvents.on.changePosition, data => {
			let coordinates = data.coordinates;
			if(data.save){
				savePoint(coordinates)
					.then(result => {
						sendPosition(socket, coordinates);
						socket.broadcast.emit(socketEvents.emit.updatePoints, result);
					})
					.catch(error => console.log(error))
			} else {
				sendPosition(socket, coordinates);
			}
		});

		socket.on(socketEvents.on.allPoints, () => {
			Point.
				listNotDeleted()
				.then(points => socket.emit(socketEvents.emit.allPoints, points));
		})

	});
};

/**
 *
 */
const sendPosition = (socket, coordinates) => {
	socket.broadcast.emit(socketEvents.emit.changePosition, coordinates);
}

/**
 *
 */
const savePoint = coordinates => {
	return new Promise((resolve, reject) => {
		let data = {
			location: {
				coordinates:[ coordinates.lng, coordinates.lat ]
			}
		};
		let point = new Point(data);
	  let error = point.validateSync();
	  if (error) {
	    reject(error)
	  } else {
	    point
	      .save()
	      .then(point => resolve(point))
	      .catch(error => reject(error));
	  }
	});
}
