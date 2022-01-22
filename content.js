console.log('gearbox-chrome-ext loading ...');

async function job() {
	if ($('span:contains("Max. drawdown")').length>0) {
		return;
	}
	const healthFactorSpan = $('span:contains("Health factor")').next();
	if (healthFactorSpan.length==0) {
		console.log('Health factor not found, retry in 3, 2, 1 ...');
		return;
	}
	
	const healthFactor = parseFloat(healthFactorSpan.text());
	const healthFactorDiv = healthFactorSpan.parent();
	const newEntry = healthFactorDiv.clone();
	newEntry.insertAfter(healthFactorDiv);
	newEntry.children().first().text('Max. drawdown');
	newEntry.children().next().text((100-100/healthFactor).toFixed(1)+'%');
}

$(document).ready(function() {
	setInterval(job, 1000);
});