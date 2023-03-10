export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}` //Базовая папка от куда запускаються файлы(папка проекта)
		},
		notify: false,
		port: 3000,
	});
}