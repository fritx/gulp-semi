## Information

> Gulp Plugin for [yyx990803/semi](https://github.com/yyx990803/semi)

<table>
  <tr>
    <td>Package</td><td>gulp-eol</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>Add or remove SEMICOLON of JavaScript</td>
  </tr>
</table>

## Usage

- `semi.add(options)`
- `semi.remove(options)`

```javascript
//var semi = require('gulp-semi').add;
var semi = require('gulp-semi').remove;

gulp.task('semi', function() {
  return gulp.src('./lib/*.js')
    .pipe(semi({ leading: true }))
    .pipe(gulp.dest('./lib/'));
});
```
