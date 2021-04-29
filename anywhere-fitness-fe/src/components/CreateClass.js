import React from 'react';

export default function CreateCourse(props) {
	return (
		<div className="form-container">
			<form className="classCreate">
				<div className="inputs">
					<label>
						Class Name:
						<input
							type="text"
							name="course"
						/>
					</label>
				</div>

				<div className="inputs">
					<label>
						Class Type:
						<input
							type="text"
							name="course_type"
						/>
					</label>
				</div>
				<div className="inputs">
					<label>
						Start Time:
						<input
							input="time"
							name="course_start"
						/>
					</label>
				</div>
				<div className="inputs">
					<label>
						Duration:
						<input
							type="text"
							name="course_duration"
						/>
					</label>
				</div>
				<div className="inputs">
					<label>
						Intensity Level:
						<input
							type="number"
							name="course_intensity"
							min="1"
							max="5"
						/>
					</label>
				</div>
				<div className="inputs">
					<label>
						Location:
						<input
							type="text"
							name="course_location"
						/>
					</label>
				</div>
				<div className="inputs">
					<label>
						Maximum Class Size:
						<input
							type="text"
							name="course_maxSize"
						/>
					</label>
				</div>
				<button name="course_create">
					Edit
				</button>
			</form>
		</div>
	);
}
