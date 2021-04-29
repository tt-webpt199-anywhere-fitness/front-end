import React from 'react';

export default function CreateCourse(props) {
	return (
		<div className="form-container">
			<form className="classCreate">
				<div className="inputs">
					<label>Class Name:</label>

					<input
						type="text"
						name="course"
					/>
				</div>

				<div className="inputs">
					<label>Class Type:</label>

					<input
						type="text"
						name="course_type"
					/>
				</div>
				<div className="inputs">
					<label>Start Time:</label>

					<input
						input="time"
						name="course_start"
					/>
				</div>
				<div className="inputs">
					<label>Duration:</label>

					<input
						type="text"
						name="course_duration"
					/>
				</div>
				<div className="inputs">
					<label>
						Intensity Level:
					</label>

					<input
						type="number"
						name="course_intensity"
						min="1"
						max="5"
					/>
				</div>
				<div className="inputs">
					<label>Location:</label>

					<input
						type="text"
						name="course_location"
					/>
				</div>
				<div className="inputs">
					<label>Max Class Size:</label>

					<input
						type="text"
						name="course_maxSize"
					/>
				</div>
				<button
					// name="course_create"
					className="edit-button"
				>
					Edit
				</button>
			</form>
		</div>
	);
}
