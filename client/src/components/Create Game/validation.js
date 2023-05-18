// VALIDACIONES
export default function validation(values) {

    let errors = {};

    if (!values.name || (/^[a-zA-Z ]{1,3}$/).test(values.name)) {
      errors.name = '*Please enter the name of the game, must be at least 3 characters long';
    }
    
    if (!values.description || values.description > 200) {
      errors.description = '* Please enter the videogame description. (Max 200 characters)';
    }

    if (values.rating < 0.5 || values.rating > 5) {
      errors.rating = "Please insert a number between 0.5 and 5";
    }

    if (!values.released) {
      errors.released = "Please insert a date"
    }

    if (values.platforms.length === 0) {
      errors.platforms = '*Please select at least one platform'
    }

    if (!values.genres) {
      errors.genres = '*Please select at least one genre'
    }

    return errors

  };