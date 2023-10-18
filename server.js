const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

andlebars.registerPartial('storedInfoPartial', '{{> storedInfoPartial }}');
