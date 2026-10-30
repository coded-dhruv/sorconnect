// build_admprtl.js - Assemble complete admprtl.html
const fs = require('fs');
const path = require('path');

const templates = require('./admin_templates');
const client = require('./admin_client');
const { cssStyles } = require('./admin_styles');

const panelsHtml = [
  templates.getSubmissionsPanel(),
  templates.getCareersPanel(),
  templates.getServicesPanel(),
  templates.getPartnersPanel(),
  templates.getProjectsPanel(),
  templates.getCategoriesPanel(),
  templates.getCarouselPanel(),
  templates.getAwardsPanel(),
  templates.getStatsPanel()
].join('\n');

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Portal | Sor Connect — Management Dashboard</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<style>
${cssStyles}
</style>
</head>
<body class="admin-body">

${templates.getLoginView()}

${templates.getDashboardShell(panelsHtml)}

${templates.getAllModals()}

${client.getClientScript()}

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'admprtl.html'), fullHtml, 'utf8');
console.log('Successfully generated admprtl.html! Total file size in characters:', fullHtml.length);
