import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
	return app.gulp.src(app.path.src.html) // Получили файлы
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			})
		)) //сообщение о ошибке
		.pipe(fileinclude()) // Build from HTML
		.pipe(app.plugins.replace(/@img\//g, 'img/')) //Обработка файло @IMG в /IMG
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({ // Датировка файлов
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						]
					},
					'output': {
						'file': 'gulp/version.json'
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html)) // Перенесли файлы
		.pipe(app.plugins.browsersync.stream()) //Обновление
}