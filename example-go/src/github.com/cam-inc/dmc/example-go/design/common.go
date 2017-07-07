package design

import (
	"github.com/cam-inc/dmc/example-go/bridge"
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

// OriginURL response header
var OriginURL = "*"

//var OriginURL = "http://localhost:8080"

// OriginAllowAll response header
var OriginAllowAll = func() {
	Methods("GET", "OPTIONS", "PUT", "POST", "DELETE") // Allow all origins to retrieve the Swagger JSON (CORS)
	Headers("Authorization", "Origin", "X-Requested-With", "Content-Type", "Accept")
}

// Color of enum
var Color = func() {
	Example("Color of Endpoint")
	Default(bridge.ColorRed)
	Enum(
		bridge.ColorRed,
		bridge.ColorBlue,
		bridge.ColorGreen,
	)
}

// Style of enum
var Style = func() {
	Example("Style of Web Component")
	Default(bridge.StyleNumber)
	Enum(
		bridge.StyleNumber,
		bridge.StyleList,
		bridge.StyleTable,
	)
}

// PageSection of enum
// ページのセクジョン
var PageSection = func() {
	Example("Section of page")
	Default(bridge.SectionManage)
	Enum(
		bridge.SectionManage,
		bridge.SectionDashboard,
	)
}

// PageGroup of enum
// ページのグループ
var PageGroup = func() {
	Example("Group of page")
	Enum(
		bridge.GroupEmpty,
		bridge.GroupKPI,
		bridge.GroupUser,
		bridge.GroupBlog,
		bridge.GroupAdmin,
	)
}

// SearchField of enum
var SearchField = func() {
	Example("Field")
	Default("default")
	Enum("default", // definition
		"date",     // yyyy mm dd - yyyy mm dd
		"time",     // hh mm - hh mm
		"datetime", // yyyy mm dd hh mm - yyyy mm dd hh mm
	)
}

//// NameType of type
//var NameType = Type("name", func() {
//	Description("A Name format")
//	Attribute("long", String, "Long name", func() {
//		Example("Design-based Management Console")
//	})
//	Attribute("short", String, "Short name", func() {
//		Example("DMC")
//	})
//	Required("short")
//})

// SearchType of type
var SearchType = Type("search", func() {
	Description("A Search format")
	Attribute("path", String, "path")
	Attribute("field", String, "field", SearchField)
	Required("path", "field")
})

// APIType of type
// クライアントが使用する、アクセス情報
var APIType = Type("api", func() {
	Description("Accessing api information type")
	Attribute("path", String, "Access paths[path] of swagger.json", func() {
		Example("/quickview")
	})
	Attribute("method", String, "Access paths[path][method] of swagger.json", func() {
		Example("get")
	})
	Required("path", "method")
})

// OptionType of type
var OptionType = Type("option", func() {
	Attribute("key", String, "Key", func() {
		Example("key")
	})
	Attribute("value", String, "Value", func() {
		Example("value")
	})
	Required("key", "value")
})

// QueryType of type
var QueryType = Type("query", func() {
	Attribute("key", String, "Key", func() {
		Example("key")
	})
	Attribute("type", String, "Type", func() {
		Example("string")
		Default("string")
		Enum("string",
			"integer",
			"number",
			"boolean",
			"date",
			"datetime",
			"time",
		)
	})
	Required("key", "type")
})

// ComponentType of type
var ComponentType = Type("component", func() {
	Description("A Component type")
	Attribute("api", APIType, "Access path of page")
	Attribute("name", String, "Title of page")
	Attribute("style", Style)                                  // Web Component style
	Attribute("options", ArrayOf(OptionType), "style options") // Web Component Style options
	Attribute("query", ArrayOf(QueryType), "query for request")
	Attribute("pagination", Boolean, "allow pagination")
	Attribute("table_labels", ArrayOf(String), "keys of table row")
	Required("api", "name", "style", "pagination")
})

// PageType of type
var PageType = Type("page", func() {
	Description("A page type")
	Attribute("id", String, "id of page")
	Attribute("name", String, "Title of page")
	Attribute("section", PageSection)
	Attribute("group", PageGroup)
	Attribute("components", ArrayOf(ComponentType), "A components format")
	Required("id", "name", "section", "group", "components")
})

// XRef of struct
type XRef struct {
	Path     string `json:"path"`
	Method   string `json:"method"`
	AppendTo string `json:"appendTo"`
}