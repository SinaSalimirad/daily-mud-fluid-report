enum Designation {
	Exploration = "exploration",
	Cuttings = "cuttings",
	ReInjection = "re-injection",
	WorkOver = "work-over",
	Repairing = "repairing",
	ReEntry = "re-entry",
	NewLeg = "new leg",
	Perforation = "perforation",
	Plugging = "plugging",
}

enum CurrencyCode {
	Dollar = "$",
	Pound = "£",
	Euro = "€",
	Yuan = "¥",
	Rial = "IRR",
}

enum WellType {
	Directional = "Directional",
	Vertical = "Vertical",
}

enum RigType {
	Offshore = "offshore",
	Onshore = "onshore",
}

enum ProductOrigin {
	Foreign = "foreign",
	Local = "local",
}

enum ProductUnit {
	Barrel = "bbl",
	Liter = "l",
	CubicMeter = "m³",
	Kilogram = "kg",
	Pound = "lb",
	Tonne = "ton",
	Gallon = "gal",
	SquareMeter = "m x m",
}

export {
	CurrencyCode,
	Designation,
	ProductOrigin,
	ProductUnit,
	RigType,
	WellType,
};
