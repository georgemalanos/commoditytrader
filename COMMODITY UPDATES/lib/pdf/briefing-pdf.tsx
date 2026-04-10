import {
  Document,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";
import type { BriefingDocument } from "@/lib/types/domain";

const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 11, color: "#12202f" },
  title: { fontSize: 20, marginBottom: 6 },
  meta: { fontSize: 10, color: "#556577", marginBottom: 14 },
  section: { marginBottom: 12, borderTop: "1 solid #d7dde5", paddingTop: 8 },
  sectionTitle: { fontSize: 13, marginBottom: 4 },
  body: { marginBottom: 4, lineHeight: 1.4 },
  bullet: { marginBottom: 2 }
});

export function BriefingPdf({ briefing }: { briefing: BriefingDocument }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{briefing.title}</Text>
        <Text style={styles.meta}>
          Generated {briefing.generatedAt} | Risk {briefing.riskLevel}
        </Text>
        <Text style={styles.body}>{briefing.executiveSummary}</Text>
        {briefing.sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.body}>{section.body}</Text>
            {section.bullets.map((bullet) => (
              <Text key={bullet} style={styles.bullet}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
